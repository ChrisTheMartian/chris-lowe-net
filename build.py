#!/usr/bin/env python3
import os
import re
import shutil
import json
import subprocess

SOURCE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(SOURCE_DIR, 'dist')

def minify_css(css_code):
    css_code = re.sub(r'/\*[\s\S]*?\*/', '', css_code)
    css_code = re.sub(r'\s*([\{\};:,])\s*', r'\1', css_code)
    css_code = re.sub(r'\s+', ' ', css_code)
    css_code = re.sub(r';\}', '}', css_code)
    return css_code.strip()

def minify_js(js_code):
    result = []
    i = 0
    n = len(js_code)
    in_string = False
    string_char = None
    
    while i < n:
        if js_code[i] in ('"', "'", '`'):
            if not in_string:
                in_string = True
                string_char = js_code[i]
            elif js_code[i] == string_char and js_code[i-1] != '\\':
                in_string = False
            result.append(js_code[i])
            i += 1
        elif not in_string and js_code[i:i+2] == '//':
            while i < n and js_code[i] != '\n':
                i += 1
        elif not in_string and js_code[i:i+2] == '/*':
            i += 2
            while i < n and js_code[i:i+2] != '*/':
                i += 1
            i += 2
        else:
            result.append(js_code[i])
            i += 1
            
    lines = []
    for line in "".join(result).splitlines():
        line = line.strip()
        if line:
            lines.append(line)
    return "\n".join(lines)

def minify_html(html_code):
    html_code = re.sub(r'<!--[\s\S]*?-->', '', html_code)
    html_code = re.sub(r'\s+', ' ', html_code)
    html_code = re.sub(r'>\s+<', '><', html_code)
    return html_code.strip()

def main():
    print("=== Step 1: Creating Build Directory ===")
    if os.path.exists(DIST_DIR):
        print(f"Cleaning existing dist directory at {DIST_DIR}...")
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR, exist_ok=True)
    
    print("=== Step 2: Compiling & Minifying CSS ===")
    with open(os.path.join(SOURCE_DIR, 'styles.css'), 'r', encoding='utf-8') as f:
        min_css = minify_css(f.read())
    with open(os.path.join(DIST_DIR, 'styles.css'), 'w', encoding='utf-8') as f:
        f.write(min_css)
        
    print("=== Step 3: Compiling & Minifying JS ===")
    for js_file in ['script.js', 'articles.js']:
        if os.path.exists(os.path.join(SOURCE_DIR, js_file)):
            with open(os.path.join(SOURCE_DIR, js_file), 'r', encoding='utf-8') as f:
                min_js = minify_js(f.read())
            with open(os.path.join(DIST_DIR, js_file), 'w', encoding='utf-8') as f:
                f.write(min_js)
                
    print("=== Step 4: Compiling & Minifying HTML ===")
    with open(os.path.join(SOURCE_DIR, 'index.html'), 'r', encoding='utf-8') as f:
        base_html = f.read()
        min_html = minify_html(base_html)
    with open(os.path.join(DIST_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(min_html)
        
    print("=== Step 5: Copying Assets ===")
    assets_dir = os.path.join(SOURCE_DIR, 'assets')
    if os.path.exists(assets_dir):
        shutil.copytree(assets_dir, os.path.join(DIST_DIR, 'assets'), dirs_exist_ok=True)
        
    print("=== Step 6: Generating Article Pages ===")
    result = subprocess.run(['node', '-e', 'console.log(JSON.stringify(require("./articles.js")))' ], cwd=SOURCE_DIR, capture_output=True, text=True)
    if result.returncode == 0:
        articles = json.loads(result.stdout)
        for art in articles:
            article_dir = os.path.join(DIST_DIR, art['id'])
            os.makedirs(article_dir, exist_ok=True)
            
            page_html = base_html
            
            # Inject meta tags
            meta_tags = f"""
  <meta name="description" content="{art.get('summary', '')}">
  <link rel="canonical" href="https://chris-lowe.net/{art['id']}/">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="chris-lowe.net">
  <meta property="og:url" content="https://chris-lowe.net/{art['id']}/">
  <meta property="og:title" content="{art['title']}">
  <meta property="og:description" content="{art.get('summary', '')}">
  <meta property="og:image" content="https://chris-lowe.net/assets/fallback-image.txt">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{art['title']}">
  <meta name="twitter:description" content="{art.get('summary', '')}">
  <meta name="twitter:image" content="https://chris-lowe.net/assets/fallback-image.txt">
  <meta property="article:published_time" content="{art.get('dateISO', '')}">
  <meta property="article:author" content="Chris Lowe">
"""
            
            page_html = re.sub(r'<title>.*?</title>', f'<title>{art["title"]} — Chris Lowe</title>', page_html)
            page_html = re.sub(r'<meta name="description" content=".*?">\s*', '', page_html)
            page_html = re.sub(r'<link rel="canonical" href=".*?">\s*', '', page_html)
            page_html = page_html.replace('</head>', meta_tags + '</head>')
            
            # Fix relative links
            page_html = page_html.replace('href="styles.css"', 'href="/styles.css"')
            page_html = page_html.replace('src="articles.js"', 'src="/articles.js"')
            page_html = page_html.replace('src="script.js"', 'src="/script.js"')
            page_html = page_html.replace('href="#', 'href="/#')
            
            # The body content
            article_body = f"""
            <main class="article-page" style="max-width: 800px; margin: 120px auto 60px auto; padding: 0 20px;">
              <a href="/" style="color: var(--accent-cyan); text-decoration: none; margin-bottom: 2rem; display: inline-block;">&larr; Back to Home</a>
              <div class="article-meta" style="margin-bottom: 0.5rem;">
                <span class="article-pillar">{art['pillar']}</span>
                <span style="color: var(--text-muted);">{art['date']} • {art['readTime']}</span>
              </div>
              <h1 style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--text-bright); margin-bottom: 0.5rem; line-height: 1.2;">{art['title']}</h1>
              <p style="color: var(--accent-cyan); font-size: 1.25rem; margin-bottom: 2rem; font-weight: 500;">{art['subtitle']}</p>
              <hr style="border: 0; border-top: 1px solid var(--border-color); margin-bottom: 2rem;">
              <div class="modal-body" style="font-size: 1.1rem; line-height: 1.6;">
                {art['content']}
              </div>
            </main>
            """
            
            page_html = re.sub(r'<!-- Hero Section -->.*?<!-- Footer -->', article_body + '\n  <!-- Footer -->', page_html, flags=re.DOTALL)
            
            with open(os.path.join(article_dir, 'index.html'), 'w', encoding='utf-8') as f:
                f.write(minify_html(page_html))
    else:
        print("Failed to run node to parse articles.js")
        print(result.stderr)

    print("\n=== Optimization Complete! ===")
    print(f"Production-ready bundle generated in: {DIST_DIR}")

if __name__ == "__main__":
    main()
