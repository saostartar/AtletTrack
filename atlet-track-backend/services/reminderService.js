// services/reminderService.js
import db from '../models/index.js';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
dotenv.config();

// Konfigurasi transporter email (gunakan layanan email yang Anda miliki)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Contoh menggunakan Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fungsi untuk mengirim email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
};

// Fungsi untuk memproses dan mengirim pengingat
export const processReminders = async () => {
  const now = new Date();
  const upcomingTime = new Date(now.getTime() + 60 * 60 * 1000); // Pengingat 1 jam sebelum acara

  try {
    const reminders = await db.Reminder.findAll({
      where: {
        waktu: {
          [Op.between]: [now, upcomingTime],
        },
        status: 'pending',
      },
      include: [{ model: db.Atlet, as: 'atlet' }, { model: db.Koordinator, as: 'koordinator' }],
    });

    for (const reminder of reminders) {
      const atlet = reminder.atlet;
      const koordinator = reminder.koordinator;
      const subject = `Pengingat: ${reminder.jenis.replace('_', ' ').toUpperCase()}`;
      const text = reminder.pesan;

      if (atlet && atlet.email) {
        await sendEmail(atlet.email, subject, text);
      }

      // Update status pengingat menjadi 'sent'
      reminder.status = 'sent';
      await reminder.save();
    }
  } catch (error) {
    console.error('Error processing reminders:', error);
  }
};

// Menjadwalkan tugas cron untuk memeriksa pengingat setiap 30 menit
export const scheduleReminderJobs = () => {
  cron.schedule('*/30 * * * *', () => {
    console.log('Checking for reminders to send...');
    processReminders();
  });
};
