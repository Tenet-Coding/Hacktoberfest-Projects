"""
Python GUI image steganography made by Sneharsh Belsare (Github: neutr0nStar)
libraries required: stegano, tkinter (requirements.txt available)
note: using a virtual environtment is recommended

How does steganography work ?
    Each character is represented using 8 bits (1 byte) ascii code (eg 01100101)
    Each pixel is represented with it's red, green and blue value (0 - 255)
    We encode 1 character (8 bit) in 3 pixels, 
    to do so, we change the r, g, b value of each pixel (if necessary)
    to either even or odd dependeing on a bit of character
        0 - make it even
        1 - make it odd
    and the 9th value (of third pixel, blue) will be 0, if there is more data, else 1 (eof)

    Eg: 
    character 'a': ascii value 97, binary : 01100001
    3 pixelf from image: (26, 63, 164), (248, 243, 194), (174, 246, 250), (148, 95, 231)

    after modification: (26, 63, 163), (248, 244, 194), (174, 246, 250), (148, 96, 231)
                    'a':  0   1    1      0    0    0      0    0    0      0   0    1
"""

# stegano library for steganography
#   lsb - for png
#   exifHeader - fro jpg
# Refer stegano docs for more info
from stegano import lsb, exifHeader

# Tkinter for GUI
import tkinter as tk
from tkinter import filedialog, messagebox

# Encrypt message in image
def encrypt(img_path: str, msg: str):
    if(img_path != 'No file selected'):
        img_path=img_path[6:]
        dot_idx = img_path.rfind('.')
        if(img_path[dot_idx:] == '.png'):
            # If png file, use lsb
            lsb.hide(img_path, msg).save(img_path[:dot_idx]+"-encrypted"+img_path[dot_idx:])
            messagebox.showinfo("Encryption", "Encrypted successfully")
        elif(img_path[dot_idx:] == '.jpg' or img_path[dot_idx:] == '.jpeg'):
            # Else use exifHeader
            exifHeader.hide(img_path, img_path[:dot_idx]+"-encrypted"+img_path[dot_idx:], secret_message=msg)
            messagebox.showinfo("Encryption", "Encrypted successfully")
        else:
            messagebox.showerror("Error", "Invalid file format")

# Decrypt message from image
def decrypt(img_path: str, msg) -> str:
    if(img_path != "No file Selected"):
        img_path=img_path[6:]
        dot_idx = img_path.rfind('.')
        if(img_path[dot_idx:] == '.png'):
            # If png file, use lsb
            msg.set(lsb.reveal(img_path))
        elif(img_path[dot_idx:] == '.jpg' or img_path[dot_idx:] == '.jpeg'):
            # Else use exifHeader
            msg.set(exifHeader.reveal(img_path).decode('utf-8'))
        else:
            messagebox.showerror("Error", "Invalid file format")

# Main
if __name__ == '__main__':

    # Create main window
    root = tk.Tk()
    root.geometry("450x450")
    root.title("Python image steganography - by Sneharsh Belsare")

    # Image variable
    img_path = tk.StringVar()
    img_path.set("No file selected")

    # Message variable
    msg = tk.StringVar()
    msg.set("")

    # Image input
    def file_inp():
        global img_path
        global msg
        msg.set("")
        img = filedialog.askopenfile()
        if(img is not None):
            img_path.set("File: " + img.name)
        else:
            img_path.set("No file selected")

    tk.Button(root, text="Select image file (png or jpg)", bg="#ddd", command=file_inp).pack(fill=tk.X, padx=10, pady=10)
    tk.Label(root, textvariable=img_path).pack(fill=tk.X, padx=10, pady=10)

    # Message input / output    
    tk.Label(root, text="Message:").pack()
    tk.Entry(root, textvariable=msg).pack(fill=tk.X, padx=10, pady=5)

    # Encrypt and Decrypt buttons
    tk.Button(root, text="Encrypt", bg="#ddd", command=lambda:encrypt(img_path.get(), msg.get())).pack(fill=tk.X, padx=10)
    tk.Button(root, text="Decrypt", bg="#ddd", command=lambda:decrypt(img_path.get(), msg)).pack(fill=tk.X, padx=10)

    # Instructions
    tk.Label(root, text="How to use :-").pack(pady=20)
    tk.Label(root, text="To encrypt:\n(i) Select image file.\n(ii) Enter message.\n(iii) Click on encrypt button\nA new file will be saved in same folder.").pack()
    tk.Label(root, text="To decrypt:\n(i) Select image.\n(ii) Click on decrypt button\nThe decrypted message will appear under Message").pack(pady=10)

    # Main loop
    root.mainloop()