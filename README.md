# JECO Base Website

Ini adalah proyek kloning (clone) website yang terinspirasi dari [https://www.jcodonuts.com/](https://www.jcodonuts.com/). Proyek ini terdiri dari tiga bagian utama: server, client admin, dan client user. Dokumen ini akan memberikan panduan instalasi dan penggunaan proyek ini.

## Server

### Langkah Pertama

Sebelum Anda dapat menjalankan server, pastikan Anda sudah menyiapkan lingkungan pengembangan dan mengikuti langkah-langkah berikut:

1. **Instalasi Package**: Pertama-tama, instal semua paket yang diperlukan. Buka terminal Anda dan jalankan perintah berikut:

    ```bash
    npm install
    ```

2. **Instalasi Database**: astikan Anda telah menginstal dan mengkonfigurasi database sesuai dengan preferensi Anda. File konfigurasi database dapat ditemukan di config/database.js. Anda dapat menggunakan database seperti MySQL, PostgreSQL, atau yang lainnya.

    ```bash
        npx sequelize db:create
    ```
3. **Migrate Table**: Setelah konfigurasi database selesai, jalankan migrasi untuk membuat tabel-tabel yang diperlukan di database:

    ```bash
        npx sequelize db:migrate
    ```
4. **Seeder**: Untuk mengisi data awal, jalankan seeder:

    ```bash
        npm sequelize db:seed:all
    ```
5. **Menjalankan Server**:jalankan server dengan perintah berikut:
    ```bash
        npm start
        Server akan berjalan pada port default 3000. Anda dapat mengaksesnya melalui http://localhost:3000.
    ```

## REST API
Server menyediakan berbagai endpoint REST API yang dapat digunakan oleh client admin dan user. Berikut adalah beberapa endpoint yang tersedia:

### API Public
- **GET** /items: Mendapatkan semua item.
- **GET** /item/:id: Mendapatkan item berdasarkan ID.
- **GET** /category: Mendapatkan semua kategori.

### API Admin
- **POST** /login: Endpoint untuk proses login.
- **POST** /add-admin: Tambahkan admin baru.

### API Category
- **GET** /category: Mendapatkan semua kategori.
- **POST** /category: Tambahkan kategori baru.
- **GET** /category/:id: Mendapatkan kategori berdasarkan ID.
- **PATCH** /category/:id: Edit kategori berdasarkan ID.
- **DELETE** /category/:id: Hapus kategori berdasarkan ID.

### API Item
- **GET** /item: Mendapatkan semua item.
- **POST** /item: Tambahkan item baru.
- **GET** /item/:id: Mendapatkan item berdasarkan ID.
- **PUT** /item/:id: Edit item berdasarkan ID.
- **DELETE** /item/:id: Hapus item berdasarkan ID.

Catatan: Untuk beberapa endpoint, diperlukan autentikasi. Pastikan Anda sudah memiliki akses token untuk menggunakan endpoint tersebut.

## Client Admin dan User
Client Admin dan User adalah bagian dari proyek ini yang dikembangkan secara terpisah. Client Admin digunakan untuk mengelola kategori dan item, sementara Client User adalah tampilan publik untuk melihat item dan kategori. Anda dapat mengembangkan dan menghubungkan klien ini ke server sesuai kebutuhan Anda.

Terima kasih telah menggunakan JECO Base Website! Semoga proyek ini berguna dalam pengembangan web Anda. Jika Anda memiliki pertanyaan atau masalah, jangan ragu untuk menghubungi kami.