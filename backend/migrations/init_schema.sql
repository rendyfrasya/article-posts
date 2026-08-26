CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('Publish', 'Draft', 'Thrash') DEFAULT 'Draft',
    
    INDEX idx_status_date (status, created_date),
    INDEX idx_category (category)
);

INSERT INTO posts (title, content, category, status) VALUES 
(
    'goalll 123 12455 5144', 
    'Ini adalah contoh konten artikel yang sengaja dibuat panjang agar memenuhi syarat validasi minimal 200 karakter. Dalam pembuatan aplikasi backend menggunakan Golang, validasi sangat penting untuk memastikan data yang masuk ke database sudah sesuai dengan ekspektasi. Oleh karena itu, kita membuat teks ini cukup panjang sehingga tidak akan terkena error dari validator Gin.', 
    'Technology', 
    'Publish'
),
(
    'Belajar Rest API Menggunakan Golang dan Gin Framework', 
    'Membuat REST API dengan bahasa pemrograman Go sangat cepat dan efisien. Framework Gin menyediakan router yang ringan serta performa tinggi yang sangat cocok untuk membangun layanan mikro maupun monolith. Pastikan untuk selalu mendefinisikan struct request dengan benar agar proses binding JSON berjalan lancar tanpa kendala.', 
    'Programming', 
    'Publish'
),
(
    'Tips dan Trik Tailwind CSS untuk Desain Modern', 
    'Tailwind CSS adalah utility-first CSS framework yang memungkinkan kita untuk merancang antarmuka web langsung di dalam markup HTML. Dengan menggunakan Tailwind, kita tidak perlu repot memikirkan nama class yang unik seperti pada CSS konvensional, sehingga proses development menjadi jauh lebih cepat dan konsisten.', 
    'Design', 
    'Draft'
),
(
    'Menata Arsitektur Database MySQL yang Baik dan Benar', 
    'Perancangan database yang optimal sangat berpengaruh pada performa aplikasi secara keseluruhan. Penggunaan index pada kolom yang sering dijadikan parameter pencarian atau filter seperti status dan kategori terbukti mampu memangkas waktu eksekusi query secara signifikan pada tabel berukuran besar.', 
    'Database', 
    'Thrash'
),
(
    'Mengenal Konsep Pemrograman Berorientasi Objek di Golang', 
    'Meskipun Golang bukan bahasa OOP murni seperti Java atau C++, Go tetap mendukung konsep enkapsulasi dan polymorphism melalui penggunaan struct dan interface. Hal ini membuat arsitektur kode menjadi jauh lebih bersih, modular, dan sangat mudah untuk dilakukan unit testing secara independen di kemudian hari.', 
    'Programming', 
    'Publish'
),
(
    'Strategi SEO Modern untuk Meningkatkan Traffic Website', 
    'Optimasi mesin pencari atau SEO terus mengalami perubahan algoritma dari waktu ke waktu. Fokus utama saat ini beralih pada pengalaman pengguna, kecepatan muat halaman web, serta kualitas konten yang mendalam dan relevan dengan maksud pencarian audiens secara spesifik di internet.', 
    'Marketing', 
    'Publish'
),
(
    'Pentingnya State Management di React dengan TanStack Query', 
    'Mengelola server state dalam aplikasi React modern kini jauh lebih mudah berkat adanya pustaka seperti TanStack Query atau React Query. Pustaka ini menangani proses caching, background refetching, serta manajemen status loading dan error secara otomatis tanpa harus membuat banyak boilerplate state manual.', 
    'Technology', 
    'Draft'
),
(
    'Panduan Lengkap Keamanan Web API dari Serangan Umum', 
    'Keamanan aplikasi web adalah prioritas utama bagi setiap pengembang. Beberapa ancaman umum seperti SQL Injection, Cross-Site Scripting (XSS), dan Cross-Site Request Forgery (CSRF) harus dicegah sejak dini dengan menerapkan sanitasi input yang ketat serta validasi token autentikasi yang aman pada setiap endpoint.', 
    'Security', 
    'Publish'
),
(
    'Membangun Skala Aplikasi Menggunakan Microservices', 
    'Arsitektur microservices memecah aplikasi monolitik besar menjadi layanan-layanan kecil yang independen. Pendekatan ini memberikan fleksibilitas tinggi dalam hal deployment dan skalabilitas tim, namun juga menuntut pemahaman yang matang mengenai manajemen jaringan dan komunikasi antar layanan yang handal.', 
    'Architecture', 
    'Draft'
),
(
    'Eksplorasi Fitur Terbaru TypeScript untuk Produktivitas', 
    'TypeScript terus berkembang dengan membawa berbagai fitur type-checking canggih yang membantu developer mendeteksi potensi error sebelum kode dijalankan di lingkungan produksi. Penggunaan tipe data yang tepat akan membuat kolaborasi tim dalam proyek skala besar menjadi jauh lebih terstruktur dan minim miskomunikasi.', 
    'Programming', 
    'Publish'
),
(
    'Seni Minimalisme dalam Desain UI/UX Aplikasi Mobile', 
    'Desain minimalis bukan berarti menghilangkan elemen estetika, melainkan memfokuskan perhatian pengguna pada fungsi utama aplikasi. Dengan ruang kosong yang cukup dan navigasi yang intuitif, tingkat kenyamanan pengguna akan meningkat drastis selama berinteraksi dengan produk digital kita.', 
    'Design', 
    'Thrash'
),
(
    'Mengatasi Masalah Performa Query Lambat di MySQL', 
    'Ketika jumlah baris data di dalam tabel mencapai jutaan, query tanpa indeks akan membebani penggunaan CPU server database. Analisis menggunakan perintah EXPLAIN sangat dianjurkan untuk melihat bagaimana MySQL mengeksekusi sebuah perintah SQL dan menentukan indeks mana yang perlu ditambahkan.', 
    'Database', 
    'Publish'
),
(
    'Memahami Konsep Asynchronous Programming di JavaScript', 
    'JavaScript bersifat single-threaded, namun mampu menangani operasi asynchronous dengan sangat baik melalui mekanisme Event Loop, Promise, serta async/await. Memahami cara kerja bagian di balik layar ini sangat penting untuk mencegah terjadinya blocking UI saat mengambil data dari server eksternal.', 
    'Programming', 
    'Draft'
),
(
    'Pemanfaatan Artificial Intelligence untuk Content Creator', 
    'Kecerdasan buatan atau AI kini menjadi asisten digital yang sangat powerful bagi para pembuat konten. Mulai dari membantu proses brainstorming ide kreatif, menyusun kerangka tulisan, hingga proses editing awal, teknologi ini terbukti mampu menghemat waktu kerja secara signifikan.', 
    'Technology', 
    'Publish'
),
(
    'Pentingnya Unit Testing dalam Siklus Pengembangan Perangkat Lunak', 
    'Menulis kode tanpa pengujian ibarat membangun jembatan tanpa uji beban. Dengan membuat unit test secara konsisten, setiap perubahan kode baru di masa mendatang tidak akan merusak fitur lama yang sudah berjalan dengan stabil di lingkungan produksi.', 
    'Engineering', 
    'Publish'
);