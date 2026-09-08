import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://eight-fearless-oryx.tilda.ws/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read()
soup = BeautifulSoup(html, 'html.parser')

with open('content.txt', 'w', encoding='utf-8') as f:
    f.write("--- TEXT ---\n")
    for el in soup.find_all(['h1', 'h2', 'h3', 'div']):
        if el.has_attr('field') and el['field'] in ['title', 'subtitle', 'descr', 'text']:
            f.write(el.get_text(separator='\n').strip() + "\n")
            f.write('---\n')

    f.write("--- IMAGES ---\n")
    for img in soup.find_all('img'):
        if img.has_attr('data-original'):
            f.write(img['data-original'] + "\n")
        elif img.has_attr('src'):
            f.write(img['src'] + "\n")

    f.write("--- VIDEOS ---\n")
    import re
    # Search for mp4 in script tags or attributes
    mp4s = re.findall(r'https?://[^\s\"\']+\.mp4', html.decode('utf-8', errors='ignore'))
    for mp4 in set(mp4s):
        f.write(mp4 + "\n")
    # Search for youtube links
    yts = re.findall(r'https?://(?:www\.)?youtube\.com/embed/[^\s\"\']+', html.decode('utf-8', errors='ignore'))
    for yt in set(yts):
        f.write(yt + "\n")
