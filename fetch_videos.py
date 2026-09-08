import re

with open(r'C:\Users\Admin\.gemini\antigravity\brain\cadb60f2-8faa-4690-89fc-4a86aad400b4\.system_generated\steps\4\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

print("--- VIDEOS ---")
mp4s = re.findall(r'https?://[^\s\"\'\\]+\.mp4', html)
for mp4 in set(mp4s):
    print(mp4)

yts = re.findall(r'https?://(?:www\.)?youtube\.com/embed/[^\s\"\'\\]+', html)
for yt in set(yts):
    print(yt)

yts2 = re.findall(r'youtu\.be/[^\s\"\'\\]+', html)
for yt in set(yts2):
    print(yt)
