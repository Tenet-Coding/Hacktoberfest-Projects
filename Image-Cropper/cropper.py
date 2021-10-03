
import cv2
from tkinter import ttk, Tk, RIDGE, Canvas, filedialog
from PIL import Image, ImageTk


class FrontEnd:
    def __init__(self, master):
        self.master = master
        style = ttk.Style()
        style.configure('My.TFrame', background='#7FFFD4')
        self.frame_header = ttk.Frame(self.master, style='My.TFrame')
        self.frame_header.pack()

        ttk.Label(
            self.frame_header,
            text="Photo Cropper",
            foreground="yellow",
            background="blue").grid(
            row=0,
            column=2,
            columnspan=1)
        ttk.Label(
            self.frame_header,
            text="An Image cropper App",
            foreground="yellow",
            background="blue").grid(
            row=1,
            column=1,
            columnspan=3)

        self.frame_menu = ttk.Frame(self.master)
        self.frame_menu.pack()
        self.frame_menu.config(relief=RIDGE, padding=(50, 15))

        style.theme_use('alt')
        style.configure(
            'TButton',
            background='blue',
            foreground='yellow',
            width=20,
            borderwidth=1,
            focusthickness=3,
            focuscolor='none')
        style.map('TButton', background=[('active', 'sky blue')])
        ttk.Button(
            self.frame_menu,
            text="Browse",
            command=self.upload_action).grid(
            row=0,
            column=0,
            columnspan=1,
            padx=5,
            pady=5,
            sticky='sw')

        ttk.Button(
            self.frame_menu,
            text="Crop",
            command=self.crop_action).grid(
            row=1,
            column=0,
            columnspan=1,
            padx=5,
            pady=5,
            sticky='sw')

        ttk.Button(
            self.frame_menu,
            text="Save As",
            command=self.save_action).grid(
            row=2,
            column=0,
            columnspan=1,
            padx=5,
            pady=5,
            sticky='sw')

        self.canvas = Canvas(
            self.frame_menu,
            bg="white",
            width=500,
            height=600)
        self.canvas.grid(row=0, column=2, rowspan=10)

        self.apply_and_cancel = ttk.Frame(self.master)
        self.apply_and_cancel.pack()
        self.apply = ttk.Button(
            self.apply_and_cancel,
            text="Apply Changes",
            command=self.apply_action).grid(
            row=0,
            column=1,
            columnspan=1,
            padx=5,
            pady=5,
            sticky='sw')

        self.apply = ttk.Button(
            self.apply_and_cancel,
            text="Reset",
            command=self.reset_action).grid(
            row=0,
            column=2,
            columnspan=1,
            padx=5,
            pady=5,
            sticky='sw')

    def upload_action(self):
        self.canvas.delete('all')
        self.img = filedialog.askopenfilename()
        self.original_image = cv2.imread(self.img)
        self.edited_img = cv2.imread(self.img)
        self.filtered_img = cv2.imread(self.img)
        self.display_image(self.edited_img)

    def crop_action(self):
        self.rectangle_id = 0
        self.crop_start_x = 0
        self.crop_start_y = 0
        self.crop_end_x = 0
        self.crop_end_y = 0
        self.canvas.bind("<ButtonPress>", self.start_crop)
        self.canvas.bind("<B1-Motion>", self.crop)
        self.canvas.bind("<ButtonRelease>", self.end_crop)

    def start_crop(self, event):
        self.crop_start_x = event.x
        self.crop_start_y = event.y

    def crop(self, event):
        if self.rectangle_id:
            self.canvas.delete(self.rectangle_id)
        self.crop_end_x = event.x
        self.crop_end_y = event.y

        self.rectangle_id = self.canvas.create_rectangle(
            self.crop_start_x, self.crop_start_y, self.crop_end_x, self.crop_end_y)

    def end_crop(self, event):
        if self.crop_start_x <= self.crop_end_x and self.crop_start_y <= self.crop_end_y:
            start_x = int(self.crop_start_x * self.ratio)
            start_y = int(self.crop_start_y * self.ratio)
            end_x = int(self.crop_end_x * self.ratio)
            end_y = int(self.crop_end_y * self.ratio)
        elif self.crop_start_x > self.crop_end_x and self.crop_start_y <= self.crop_end_y:
            start_x = int(self.crop_end_x * self.ratio)
            start_y = int(self.crop_start_y * self.ratio)
            end_x = int(self.crop_start_x * self.ratio)
            end_y = int(self.crop_end_y * self.ratio)
        elif self.crop_start_x <= self.crop_end_x and self.crop_start_y > self.crop_end_y:
            start_x = int(self.crop_start_x * self.ratio)
            start_y = int(self.crop_end_y * self.ratio)
            end_x = int(self.crop_end_x * self.ratio)
            end_y = int(self.crop_start_y * self.ratio)
        else:
            start_x = int(self.crop_end_x * self.ratio)
            start_y = int(self.crop_end_y * self.ratio)
            end_x = int(self.crop_start_x * self.ratio)
            end_y = int(self.crop_start_y * self.ratio)

        x = slice(start_x, end_x, 1)
        y = slice(start_y, end_y, 1)
        self.filtered_img = self.edited_img[y, x]
        self.display_image(self.filtered_img)

    def save_action(self):
        original_file_type = self.img.split('.')[-1]
        filename = filedialog.asksaveasfilename()
        filename = filename + "." + original_file_type

        save_as_img = self.edited_img
        cv2.imwrite(filename, save_as_img)
        self.img = filename

    def apply_action(self):
        self.edited_img = self.filtered_img
        self.display_image(self.edited_img)

    def reset_action(self):
        self.edited_img = self.original_image.copy()
        self.display_image(self.original_image)

    def display_image(self, image=None):
        self.canvas.delete('all')
        if image is None:
            if self.edited_img:
                image = self.edited_img.copy()
        else:
            image = image
        try:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            height, width, channels = image.shape
            ratio = height / width

            new_width = width
            new_height = height

            if height > 600 or width > 500:
                if ratio < 1:
                    new_width = 500
                    new_height = int(new_width * ratio)
                else:
                    new_height = 600
                    new_width = int(new_height * (width / height))

            self.ratio = height / new_height
            self.new_image = cv2.resize(image, (new_width, new_height))
            self.new_image = ImageTk.PhotoImage(
                Image.fromarray(self.new_image))
            self.canvas.config(width=new_width, height=new_height)
            self.canvas.create_image(
                new_width / 2,
                new_height / 2,
                image=self.new_image)
        except BaseException:
            pass


mainWindow = Tk()
mainWindow.configure(background='#7FFFD4')
FrontEnd(mainWindow)
mainWindow.mainloop()
