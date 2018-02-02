# -*- coding: utf-8 -*-
import telebot


def send_app(name, phone, type, city=''):
    token = '482033449:AAFvtdyoXs3PO-3kC-tZNHR1DZfsolGbQog'
    bot = telebot.TeleBot(token)
    ids = []
    text_mes = '{}\nИмя: {}\nТелефон: {}\n'.format(type, name, phone)

    if city != '':
        text_mes += 'Город: {}\n'.format(city)

    bot.send_message('@mebelmaxappliesgroup', text_mes)


token = '482033449:AAFvtdyoXs3PO-3kC-tZNHR1DZfsolGbQog'
bot = telebot.TeleBot(token)

password = 'indesign12'


def write_ids(data):
    with open('id.txt', 'a') as f:
        f.write(data)

# @bot.message_handler(commands=['start'])
# def start(message):
#     step = bot.send_message(message.chat.id, 'Введите пароль')
#     bot.register_next_step_handler(step, hello)
# def hello(message):
#     if message.text == password:
#         bot.send_message(message.chat.id, 'Успешно\nВы занесены в базу для рассылки')
#         chat_id = str(message.chat.id) + '\n'
#         write_ids(chat_id)
#     else:
#         bot.send_message(message.chat.id, 'Неверный пароль\nПопробуйте снова')
#         start(message)


# if __name__ == '__main__':
#     bot.polling(none_stop=True)
