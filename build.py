#!/usr/bin/env python3
import os
import re
import shutil

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
        min_html = minify_html(f.read())
    with open(os.path.join(DIST_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(min_html)
        
    print("=== Step 5: Copying Assets ===")
    assets_dir = os.path.join(SOURCE_DIR, 'assets')
    if os.path.exists(assets_dir):
        shutil.copytree(assets_dir, os.path.join(DIST_DIR, 'assets'), dirs_exist_ok=True)
        
    print("\n=== Optimization Complete! ===")
    print(f"Production-ready bundle generated in: {DIST_DIR}")

if __name__ == "__main__":
    main()
