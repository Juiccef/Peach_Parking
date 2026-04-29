# Trim Logo

Trim whitespace from a partner logo image and save a clean version ready for the website.

Takes a logo file path as input. Detects the actual content bounding box (ignoring white/near-white background), crops tightly with a small padding, and saves a `-trimmed.png` version in the same directory.

If the logo content is white-on-white or very light (not detectable), automatically inverts the image first before trimming so the content becomes visible and dark.

After trimming, report the original size, content bounding box, and output file size so the user can verify the crop was accurate.

## Usage

```
/trim-logo logos/some-logo.png
```

## Steps

1. Open the file with PIL and convert to RGBA
2. Scan pixels to find non-white, non-transparent content (threshold: r>230, g>220, b>200 = background)
3. If no content is found, invert the RGB channels and retry — the logo is likely white-on-white
4. Crop to the content bounding box with 10px padding on all sides
5. Save as `<original-name>-trimmed.png` in the same directory
6. Report: original dimensions, content area found, output path and dimensions
7. Show a preview of the trimmed image

## Notes

- Always install Pillow first if not available: `pip3 install pillow --break-system-packages`
- Use the trimmed file in HTML `<img src="...">` tags — no CSS height overrides needed since whitespace is gone
- For logos with colored backgrounds (not white), this script may not work — flag it to the user
