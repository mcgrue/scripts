import win32clipboard
import re

# set clipboard data
#win32clipboard.OpenClipboard()
#win32clipboard.EmptyClipboard()
#win32clipboard.SetClipboardText('testing 123')
#win32clipboard.CloseClipboard()

# get clipboard data
# win32clipboard.OpenClipboard()
# data = win32clipboard.GetClipboardData()
# win32clipboard.CloseClipboard()
# print data

_next_upper = False
def _spongebobify(str):
  global _next_upper

  retval = ''
  for char in str:
    if _next_upper:
      retval = retval + char.upper()
    else:
      retval = retval + char.lower()

    _next_upper = (not _next_upper)
  
  return retval


def spongebobifier(str):
  iter = re.finditer('([^a-zA-Z]*)?', str)
  ascii_accumulator = ''
  retval = ''
  for match in iter:
    span = match.span()
    if span[0] == span[1] and span[0] < len(str):
      ascii_accumulator = ascii_accumulator + str[span[0]]
      continue
    else:
      retval = retval + _spongebobify(ascii_accumulator)
      ascii_accumulator = ''
      retval = retval + str[span[0]:span[1]]

  #print(retval)
  return retval

win32clipboard.OpenClipboard()
data = win32clipboard.GetClipboardData()
# print(data)
# print()
data = spongebobifier(data)
# print(data)
# print()
win32clipboard.EmptyClipboard()
win32clipboard.SetClipboardText(data, win32clipboard.CF_UNICODETEXT)
win32clipboard.CloseClipboard()

#spongebobifier("the forbidden starburst")
#spongebobifier("the! forbidden! starburst!")
#spongebobifier("the!!! forbidden!!! starburst!!!!")
#spongebobifier("what, the actual fuck?")
#spongebobifier("what 😎 the 😎😎🍆 actual fuck🍆🍆🍆🍆?1")
#spongebobifier("the!!! forbidden!!! starburst!!!! aldsjfhlkh")
