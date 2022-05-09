from PIL import Image,ImageDraw,ImageGrab
import io
from io import BytesIO
import codecs
import os
import ctypes
import win32clipboard as clip
import win32con

MessageBox = ctypes.windll.user32.MessageBoxW

img = ImageGrab.grabclipboard()

if img == None:
	MessageBox(None, 'There was no image', 'Cannot Convert', 0)
	exit(1)

rgb_im = img.convert('RGB')
r, g, b = rgb_im.getpixel((0, 0))

w = img.width
h = img.height

new_height = int( (w*9)/16 )

if new_height < h:
	MessageBox(None, 'New Height would be shorter.  Dumbass.', 'Cannot Convert', 0)
	exit(2)

new_im = Image.new('RGB', (w,new_height))
flood = (r,g,b)
ImageDraw.floodfill(new_im, (0,0), flood, thresh=50)

centered_y = int((new_height-h)/2)

new_im.paste(img, (0, centered_y))

tmp_file = "E:\\tmp\\clipboard_image_resize.png"

if os.path.exists(tmp_file):
  os.remove(tmp_file)

new_im.save(tmp_file, 'PNG')

output = BytesIO()
new_im.convert('RGB').save(output, 'BMP')
data = output.getvalue()[14:]
output.close()
clip.OpenClipboard()
clip.EmptyClipboard()
clip.SetClipboardData(win32con.CF_DIB, data)
clip.CloseClipboard()