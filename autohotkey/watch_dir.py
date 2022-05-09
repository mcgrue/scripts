import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

import glob
import os
import sys

#import getpass
#print(getpass.getuser())

patterns = ["*"]
ignore_patterns = None
ignore_directories = False
case_sensitive = True
my_event_handler = PatternMatchingEventHandler(patterns, ignore_patterns, ignore_directories, case_sensitive)

def on_created(event):
    global open_file
    open_file = event.src_path

def on_deleted(event):
    #print(f"what the f**k! Someone deleted {event.src_path}!")
    pass

def on_modified(event):
    #print(f"hey buddy, {event.src_path} has been modified")
    pass

def on_moved(event):
    #print(f"ok ok ok, someone moved {event.src_path} to {event.dest_path}")
    pass

my_event_handler.on_created = on_created
my_event_handler.on_deleted = on_deleted
my_event_handler.on_modified = on_modified
my_event_handler.on_moved = on_moved

args = sys.argv
if len(args) < 2:
    print("Please pass in the directory to watch as an argument")
    exit(-1)

path = args[1]

print("attempting to scan", path)

go_recursively = True
my_observer = Observer()
my_observer.schedule(my_event_handler, path, recursive=go_recursively)

list_of_files = glob.glob(path+'\*') # * means all if need specific format then *.csv

first = max(list_of_files, key=os.path.getctime)

open_file = first
file_handle = False

my_observer.start()

try:
    _cur_open_file = False
    while True:
        if not file_handle:
            file_handle = open(open_file, 'r')
            _cur_open_file = open_file
            print(f"Opening {open_file}")
        elif open_file != _cur_open_file:
            print(f"Closing {file_handle.name}")
            file_handle.close()
            file_handle = None
        else: #tail
            new_words = file_handle.readline()
            if new_words:
                while new_words:
                    print(new_words, end='')
                    new_words = file_handle.readline()
        time.sleep(.1)
except KeyboardInterrupt:
    my_observer.stop()
    my_observer.join()
except Exception as e:
    print("Error", e)