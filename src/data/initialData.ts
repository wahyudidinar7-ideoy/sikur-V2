import {
  SchoolProfile,
  KospData,
  ProtaItem,
  PromesItem,
  RppmItem,
  RpphItem,
  BankActivityItem,
  Student,
  Teacher,
  AssessmentRecord,
  RaportNarrative,
  DailyTeacherJournal
} from '../types';

export const initialSchoolProfile: SchoolProfile = {
  namaSekolah: 'TK CERIA GEMILANG',
  npsn: '69784321',
  alamat: 'Jl. Melati Ceria No. 12, Kel. Sukamaju',
  kelurahan: 'Sukamaju',
  kecamatan: 'Cimanggis',
  kota: 'Kota Depok',
  provinsi: 'Jawa Barat',
  kodePos: '16455',
  telepon: '(021) 8775432',
  email: 'tkceriagemilang@gmail.com',
  website: 'www.tkceriagemilang.sch.id',
  namaKepalaSekolah: 'Dra. Hj. Sri Wahyuni, M.Pd',
  nipKepalaSekolah: '19760815 200212 2 003',
  tahunAjaran: '2026/2027',
  semesterAktif: 'Ganjil',
  kelompokAktif: 'A'
};

export const initialKospData: KospData = {
  visi: 'Membentuk Generasi Anak Usia Dini yang Beriman, Ceria, Berakhlak Mulia, Mandiri, Kreatif, dan Cinta Tanah Air Berlandaskan Nilai Pancasila.',
  misi: [
    'Menumbuhkan pembiasaan ibadah harian, adab sopan santun, dan rasa syukur sejak dini.',
    'Menciptakan lingkungan belajar yang aman, ramah anak, dan merangsang eksplorasi bermain bermakna.',
    'Mengembangkan kecerdasan majemuk (multiple intelligences) anak melalui pendekatan STEAM dan bermain peran.',
    'Memfasilitasi kemandirian, kepercayaan diri, dan regulasi emosi anak yang berdaya tahan.',
    'Menjalin kemitraan kolaboratif yang harmonis bersama orang tua dan masyarakat sekitar.'
  ],
  tujuan: [
    'Anak mengenal Allah SWT/Tuhan YME serta mencintai seluruh ciptaan-Nya.',
    'Anak memiliki kebiasaan hidup bersih, sehat, bergizi, dan menjaga keselamatan diri.',
    'Anak mampu mengelola emosi, berempati, dan bekerja sama dengan teman sebaya.',
    'Anak menunjukkan daya nalar kritis, rasa ingin tahu tinggi, dan kemampuan memecahkan masalah sederhana.',
    'Anak memiliki kemampuan komunikasi lisan dan keaksaraan awal yang menyenangkan tanpa tekanan calistung kaku.'
  ],
  karakteristik: 'TK CERIA GEMILANG terletak di lingkungan asri dengan kebun botani mini dan area bermain luar (outdoor playground) alami. Kurikulum mengadopsi Kurikulum Merdeka PAUD dengan pendekatan Berbasis Bermain (Play-Based Learning), Loose Parts (bahan lepasan alami), dan Penguatan Profil Pelajar Pancasila (P5) yang berakar pada kearifan budaya nusantara.',
  dimensiP5: [
    {
      nama: '1. Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia',
      deskripsi: 'Mengenal kebiasaan berdoa, mengasihi sesama makhluk hidup (hewan dan tanaman), serta berperilaku jujur dan santun.',
      fokusPaud: 'Praktik wudhu/doa harian, berbagi makanan, merawat tanaman di pot masing-masing.'
    },
    {
      nama: '2. Berkebinekaan Global',
      deskripsi: 'Mengenal keberagaman budaya, bahasa daerah, pakaian adat, dan saling menghormati perbedaan di kelas.',
      fokusPaud: 'Mengenal tarian nusantara, hari busana adat, dan saling menyapa dengan santun.'
    },
    {
      nama: '3. Bergotong Royong',
      deskripsi: 'Mampu bekerja sama, saling membantu membereskan mainan, dan berbagi alat kreasi bersama teman.',
      fokusPaud: 'Bermain balok kelompok, piket makan bersama, dan saling menolong saat teman terjatuh.'
    },
    {
      nama: '4. Mandiri',
      deskripsi: 'Memiliki kepercayaan diri, inisiatif membuka sepatu, mengenakan tas, dan makan sendiri secara tertib.',
      fokusPaud: 'Toilet training mandiri, meletakkan botol minum di loker, dan memilih sentra main sendiri.'
    },
    {
      nama: '5. Bernalar Kritis',
      deskripsi: 'Mampu bertanya "mengapa" dan "bagaimana", mengeksplorasi sebab akibat, serta mencocokkan pola sederhana.',
      fokusPaud: 'Eksperimen sains terapung-tenggelam, membandingkan berat ringan, dan menyortir warna/ukuran daun.'
    },
    {
      nama: '6. Kreatif',
      deskripsi: 'Mampu memodifikasi dan menghasilkan karya orisinal dari berbagai media seni, loose parts, dan gerak tubuh.',
      fokusPaud: 'Melukis bebas dengan jari (finger painting), menyusun pola loose parts, dan menirukan gerak binatang.'
    }
  ],
  kalenderRingkas: [
    { bulan: 'Juli 2026', kegiatan: 'MPLS Ramah Anak, Pengenalan Lingkungan & Asesmen Awal', keterangan: '3 Pekan pertama' },
    { bulan: 'Agustus 2026', kegiatan: 'Pekan Kemerdekaan RI, Pawai Budaya, Festival Permainan Tradisional', keterangan: 'Proyek P5 Bhinneka' },
    { bulan: 'September 2026', kegiatan: 'Pekan Sehat: Dokter Kecil & Edukasi Makanan Sehat', keterangan: 'Kemitraan Puskesmas' },
    { bulan: 'Oktober 2026', kegiatan: 'Kunjungan Edukatif ke Kebun Binatang / Peternakan', keterangan: 'Tema Hewan Ciptaan Tuhan' },
    { bulan: 'November 2026', kegiatan: 'Pameran Karya Siswa (Gelar Karya P5) & Panggung Gembira', keterangan: 'Apresiasi Seni' },
    { bulan: 'Desember 2026', kegiatan: 'Asesmen Sumatif Akhir Semester & Pembagian Raport Semester 1', keterangan: 'Laporan Narasi' },
    { bulan: 'Januari 2027', kegiatan: 'Awal Semester 2, Tema Transportasi & Profesi Mulia', keterangan: 'Kunjungan Pemadam Kebakaran' },
    { bulan: 'Maret 2027', kegiatan: 'Pekan Sains Ceria PAUD & Ramadhan Ceria', keterangan: 'Amaliyah Berbagi' },
    { bulan: 'Mei 2027', kegiatan: 'Pentas Seni Akhir Tahun & Gelar Budaya Ceria', keterangan: 'Kelulusan Kelompok B' },
    { bulan: 'Juni 2027', kegiatan: 'Penerimaan Raport Semester 2 & Libur Akhir Tahun', keterangan: 'Transisi PAUD ke SD Menyenangkan' }
  ]
};

export const initialProtaList: ProtaItem[] = [
  // Semester 1
  {
    id: 'prota-1',
    semester: 'Ganjil',
    bulan: 'Juli - Agustus',
    alokasiMinggu: 4,
    tema: 'Aku Sayang Diriku (Diriku)',
    subTema: ['Identitasku (Nama, Usia, Kelamin)', 'Anggota Tubuhku & Fungsinya', 'Pancaindra Ciptaan Allah', 'Merawat Kebersihan & Kesehatan Diri'],
    tujuanPembelajaran: [
      'Menyebutkan nama diri, usia, dan ciri fisiknya dengan bangga',
      'Mengenal anggota tubuh serta fungsinya untuk beraktivitas',
      'Menunjukkan kebiasaan mencuci tangan 6 langkah dan menyikat gigi',
      'Mengungkapkan perasaan dan kebutuhan dasar secara lisan'
    ],
    proyekP5: 'Aku Anak Sehat dan Bersih (Bangunlah Jiwa dan Raganya)'
  },
  {
    id: 'prota-2',
    semester: 'Ganjil',
    bulan: 'Agustus - September',
    alokasiMinggu: 3,
    tema: 'Keluargaku Tersayang',
    subTema: ['Anggota Keluarga Inti (Ayah, Ibu, Adik, Kakak)', 'Peran & Kebiasaan Baik di Rumah', 'Rumahku Surgaku (Ruangan & Fungsinya)'],
    tujuanPembelajaran: [
      'Menunjukkan rasa hormat dan kasih sayang pada orang tua dan saudara',
      'Membantu tugas sederhana di rumah seperti merapikan mainan',
      'Menceritakan kegiatan keluarga dengan kalimat sederhana'
    ],
    proyekP5: 'Kasih Sayang di Rumahku (Hidup Berkelanjutan)'
  },
  {
    id: 'prota-3',
    semester: 'Ganjil',
    bulan: 'September - Oktober',
    alokasiMinggu: 3,
    tema: 'Lingkunganku yang Asri',
    subTema: ['Sekolahku yang Bersih & Ramah', 'Teman-temanku & Guru', 'Taman Bunga & Sampah di Sekitarku'],
    tujuanPembelajaran: [
      'Mengenal aturan kelas dan cara bermain bergantian dengan aman',
      'Membuang sampah pada tempatnya (organik & anorganik)',
      'Menghargai hasil karya teman dan menyapa dengan ramah'
    ],
    proyekP5: 'Sahabat Cilik Penjaga Kebersihan (Gaya Hidup Berkelanjutan)'
  },
  {
    id: 'prota-4',
    semester: 'Ganjil',
    bulan: 'Oktober - November',
    alokasiMinggu: 4,
    tema: 'Binatang Sahabat Kita',
    subTema: ['Binatang Peliharaan (Kucing, Ikan, Kelinci)', 'Binatang Ternak (Ayam, Sapi, Kambing)', 'Binatang Liar & Serangga (Kupu-kupu, Lebah, Burung)', 'Tempat Hidup & Cara Berkembang Biak'],
    tujuanPembelajaran: [
      'Menyayangi binatang sebagai makhluk ciptaan Allah',
      'Menirukan suara, gerak, dan cara berjalan berbagai jenis binatang',
      'Mengelompokkan binatang berdasarkan jumlah kaki dan tempat hidupnya'
    ],
    proyekP5: 'Menyayangi Hewan Ciptaan Tuhan (Aku Sayang Bumi)'
  },
  {
    id: 'prota-5',
    semester: 'Ganjil',
    bulan: 'November - Desember',
    alokasiMinggu: 3,
    tema: 'Tanaman Ceria & Subur',
    subTema: ['Tanaman Hias & Bunga Warna-warni', 'Tanaman Buah & Sayuran Bergizi', 'Bagian-bagian Pohon (Akar, Batang, Daun, Buah)'],
    tujuanPembelajaran: [
      'Menyiram dan merawat tanaman dengan telaten',
      'Mengenal aneka rasa buah dan manfaat sayur hijau bagi tubuh',
      'Membuat kolase atau kreasi cap daun menggunakan media alami'
    ],
    proyekP5: 'Ayo Berkebun Ceria di Sekolah (Aku Sayang Bumi)'
  },
  // Semester 2
  {
    id: 'prota-6',
    semester: 'Genap',
    bulan: 'Januari - Februari',
    alokasiMinggu: 4,
    tema: 'Kendaraan & Transportasi',
    subTema: ['Kendaraan Darat (Sepeda, Mobil, Kereta Api)', 'Kendaraan Air (Perahu, Kapal Laut)', 'Kendaraan Udara (Pesawat, Helikopter)', 'Rambu Lalu Lintas & Keselamatan di Jalan'],
    tujuanPembelajaran: [
      'Menyebutkan jenis kendaraan sesuai jalur transportasinya',
      'Mengenal warna lampu lalu lintas (Merah, Kuning, Hijau) dan maknanya',
      'Membangun miniatur jalan raya menggunakan balok warna-warni'
    ],
    proyekP5: 'Patuhi Rambu, Selamat di Jalan (Rekayasa & Teknologi)'
  },
  {
    id: 'prota-7',
    semester: 'Genap',
    bulan: 'Februari - Maret',
    alokasiMinggu: 3,
    tema: 'Pekerjaan & Cita-citaku',
    subTema: ['Guru, Dokter, dan Perawat', 'Polisi, Tentara, dan Pemadam Kebakaran', 'Petani, Nelayan, dan Koki'],
    tujuanPembelajaran: [
      'Menghargai setiap jenis profesi yang bermanfaat bagi masyarakat',
      'Bermain peran secara antusias sesuai karakter cita-cita yang dipilih',
      'Mengenal peralatan yang digunakan oleh berbagai profesi'
    ],
    proyekP5: 'Kelak Aku Ingin Menjadi... (Kewirausahaan & Jati Diri)'
  },
  {
    id: 'prota-8',
    semester: 'Genap',
    bulan: 'Maret - April',
    alokasiMinggu: 3,
    tema: 'Air, Udara, dan Api yang Ajaib',
    subTema: ['Manfaat & Sifat Air (Bermain Percobaan Terapung Tenggelam)', 'Udara untuk Bernapas & Meniup Balon', 'Bahaya & Manfaat Api (Lilin dan Kompor)'],
    tujuanPembelajaran: [
      'Melakukan eksperimen sederhana dengan air dan udara',
      'Mengenal sifat bahaya api dan cara berhati-hati di dekat benda panas',
      'Mengungkapkan kekaguman atas karunia unsur alam ciptaan Tuhan'
    ],
    proyekP5: 'Detektif Cilik Unsur Alam (STEAM Sains PAUD)'
  },
  {
    id: 'prota-9',
    semester: 'Genap',
    bulan: 'April - Mei',
    alokasiMinggu: 3,
    tema: 'Negaraku Indonesia Tercinta',
    subTema: ['Bendera Merah Putih & Lagu Indonesia Raya', 'Presiden & Lambang Garuda Pancasila', 'Pakaian Adat & Rumah Tradisional Nusantara'],
    tujuanPembelajaran: [
      'Menghormati bendera merah putih dan menyanyikan lagu nasional dengan khidmat',
      'Mengenal dasar Pancasila melalui dongeng dan simbol sila',
      'Bangga menjadi anak Indonesia yang ramah dan bersatu'
    ],
    proyekP5: 'Kita Berbeda Namun Tetap Satu Ceria (Bhinneka Tunggal Ika)'
  },
  {
    id: 'prota-10',
    semester: 'Genap',
    bulan: 'Mei - Juni',
    alokasiMinggu: 4,
    tema: 'Alam Semesta & Gejala Alam',
    subTema: ['Matahari, Bulan, dan Bintang Gemerlap', 'Terjadinya Siang dan Malam', 'Hujan, Pelangi yang Indah, dan Awan', 'Bumi & Menjaga Kebersihan Lingkungan'],
    tujuanPembelajaran: [
      'Menyebutkan benda-benda langit ciptaan Tuhan',
      'Menceritakan proses munculnya pelangi setelah hujan',
      'Menunjukkan kepedulian tidak membuang sampah ke sungai agar tidak banjir'
    ],
    proyekP5: 'Penjelajah Cilik Luar Angkasa (Imajinasi dan Kreativitas)'
  }
];

export const initialPromesList: PromesItem[] = [
  {
    id: 'promes-1',
    semester: 'Ganjil',
    bulan: 'Juli',
    mingguKe: 1,
    tema: 'Diriku',
    subTema: 'Identitasku',
    topik: 'Namaku & Teman Baruku',
    alokasiHari: 5,
    tujuanPembelajaran: 'Anak mampu mengenalkan diri dan menyapa teman dengan ramah',
    kegiatanUtama: 'Lingkaran perkenalan, membuat kalung kartu nama bergambar, bernyanyi "Siapa Namamu"'
  },
  {
    id: 'promes-2',
    semester: 'Ganjil',
    bulan: 'Juli',
    mingguKe: 2,
    tema: 'Diriku',
    subTema: 'Anggota Tubuhku',
    topik: 'Kepala, Tangan, dan Kakiku',
    alokasiHari: 5,
    tujuanPembelajaran: 'Mengetahui nama dan fungsi tangan serta kaki untuk bergerak',
    kegiatanUtama: 'Menjiplak telapak tangan di atas kertas, senam irama ceria, melompat di lingkaran warna'
  },
  {
    id: 'promes-3',
    semester: 'Ganjil',
    bulan: 'Agustus',
    mingguKe: 3,
    tema: 'Diriku',
    subTema: 'Pancaindra',
    topik: 'Mata Melihat, Telinga Mendengar',
    alokasiHari: 5,
    tujuanPembelajaran: 'Mengeksplorasi rasa, bau, suara, dan tekstur benda sekitar',
    kegiatanUtama: 'Tebak bunyi instrumen, meraba permukaan kasar-halus kain, mencicip manis dan asam'
  },
  {
    id: 'promes-4',
    semester: 'Ganjil',
    bulan: 'Agustus',
    mingguKe: 4,
    tema: 'Keluargaku',
    subTema: 'Anggota Keluarga',
    topik: 'Ayah dan Ibuku Hebat',
    alokasiHari: 5,
    tujuanPembelajaran: 'Mengenal peran anggota keluarga dan cara menyayangi orang tua',
    kegiatanUtama: 'Bermain peran mama-papa di rumah, menggambar wajah keluarga, menempel stik es krim foto keluarga'
  },
  {
    id: 'promes-5',
    semester: 'Ganjil',
    bulan: 'September',
    mingguKe: 5,
    tema: 'Lingkunganku',
    subTema: 'Sekolahku Bersih',
    topik: 'Ruang Kelas & Tempat Mainku',
    alokasiHari: 5,
    tujuanPembelajaran: 'Mentaati aturan kelas dan mengembalikan mainan pada tempatnya',
    kegiatanUtama: 'Operasi semut pungut daun kering, menyusun balok bentuk TK impian, melukis ayunan'
  },
  {
    id: 'promes-6',
    semester: 'Ganjil',
    bulan: 'Oktober',
    mingguKe: 6,
    tema: 'Binatang Sahabat',
    subTema: 'Binatang Peliharaan',
    topik: 'Kucing Manis & Kelinci Lucu',
    alokasiHari: 5,
    tujuanPembelajaran: 'Menyayangi binatang dan meniru gerak lincah hewan berkaki empat',
    kegiatanUtama: 'Membuat topeng kelinci, menempel kapas pada gambar domba/kucing, memberi makan ikan di kolam sekolah'
  },
  {
    id: 'promes-7',
    semester: 'Ganjil',
    bulan: 'November',
    mingguKe: 7,
    tema: 'Tanaman Ceria',
    subTema: 'Tanaman Buah',
    topik: 'Apel Merah & Jeruk Manis',
    alokasiHari: 5,
    tujuanPembelajaran: 'Mengenal warna, bentuk, dan vitamin pada buah sehat',
    kegiatanUtama: 'Mengecap apel dengan cat air, membuat salad buah bersama bunda, menghitung biji jeruk'
  }
];

export const initialRppmList: RppmItem[] = [
  {
    id: 'rppm-w6',
    semester: 'Ganjil',
    bulan: 'Oktober 2026',
    mingguKe: 6,
    kelompok: 'A',
    rentangTanggal: '12 - 16 Oktober 2026',
    tema: 'Binatang Sahabat Kita',
    subTema: 'Binatang Peliharaan yang Lucu',
    topik: 'Kucing Manisku yang Manja',
    tujuanPembelajaran: [
      'Menunjukkan rasa syukur atas ciptaan Allah berupa binatang kucing yang lucu',
      'Mampu menceritakan ciri fisik kucing (telinga runcing, kumis, ekor lembut, berkaki 4)',
      'Mengembangkan motorik halus melalui kegiatan meronce kalung kucing dan menggunting pola',
      'Mengenal konsep angka 1-5 dengan menghitung ikan mainan makanan kucing',
      'Bekerja sama dalam kelompok saat merapikan perlengkapan bermain'
    ],
    rencanaSenin: [
      'Menirukan suara dan gaya jalan kucing "Meong-meong"',
      'Mencari jejak telapak kaki kucing di halaman pasir',
      'Menyusun balok kayu menjadi rumah kandang kucing',
      'Melukis wajah kucing dengan cat air di piring kertas'
    ],
    rencanaSelasa: [
      'Bercerita dengan boneka tangan kucing & tikus',
      'Mengelompokkan makanan yang disukai kucing (ikan vs wortel)',
      'Meronce sedotan warna-warni menjadi kalung kucing',
      'Bermain sensori pasir mencari miniatur kucing yang tersembunyi'
    ],
    rencanaRabu: [
      'Eksplorasi tekstur bulu kucing vs sisik ikan dengan kartu raba',
      'Menghubungkan kartu angka dengan jumlah gambar ikan (1-5)',
      'Bermain peran dokter hewan (memeriksa kucing yang sedang demam)',
      'Mencap pola telapak kaki kucing dengan cap spons'
    ],
    rencanaKamis: [
      'Menempel kapas putih pada gambar anak kucing berbulu lebat',
      'Senam irama "Kucing Belang" diiringi musik gembira',
      'Bermain puzzle gambar kucing 4-6 keping',
      'Menyusun kata k-u-c-i-n-g dengan batu kerikil berhuruf'
    ],
    rencanaJumat: [
      'Mempraktikkan adab menyayangi binatang (memberi minum kucing)',
      'Membuat biskuit bentuk ikan dari adonan plastisin playdough',
      'Pameran mini hasil karya gambar kucing di mading kelas',
      'Refleksi mingguan: anak menceritakan hal paling seru yang dipelajari'
    ],
    alatBahan: [
      'Plastisin playdough aneka warna',
      'Balok kayu unit sentra rancang bangun',
      'Piring kertas, cat air washable, kuas bulat',
      'Boneka tangan kucing, stetoskop mainan dokter',
      'Batu kerikil pipih berhuruf, kapas bola, lem fox',
      'Pola gambar kucing, gunting ujung tumpul anak'
    ],
    teknikAsesmen: [
      'Ceklis Ketercapaian Tujuan Pembelajaran',
      'Catatan Anekdot Perilaku Unik',
      'Dokumentasi Foto Hasil Karya Siswa'
    ]
  }
];

export const initialRpphList: RpphItem[] = [
  {
    id: 'rpph-1',
    rppmId: 'rppm-w6',
    kelompok: 'A',
    semester: 'Ganjil',
    mingguKe: 6,
    hari: 'Senin',
    tanggal: '2026-10-12',
    tema: 'Binatang Sahabat Kita',
    subTema: 'Binatang Peliharaan',
    subSubTema: 'Mengenal Ciri-ciri Kucing Manja',
    tujuanPembelajaran: [
      'Anak mengucapkan rasa syukur atas ciptaan Tuhan melalui doa sebelum belajar (Nilai Agama)',
      'Anak menunjukkan sikap berani maju menirukan gerakan kucing melompat (Jati Diri)',
      'Anak mampu menyebutkan 3 bagian tubuh kucing: telinga, kumis, ekor (Bahasa)',
      'Anak menyusun 5-8 balok kayu menjadi kandang kucing kokoh (Literasi & STEAM)',
      'Anak menggunting dan menempel kumis kucing dengan koordinasi mata-tangan baik (Motorik)'
    ],
    kegiatanPembuka: {
      salamDanDoa: 'Guru menyambut anak dengan senyum 5S, berbaris rapi, membaca doa pembuka hati & doa untuk kedua orang tua bersama-sama.',
      sopPenyambutan: 'Memeriksa kebersihan kuku dan suhu tubuh, meletakkan sepatu dan tas di loker mandiri.',
      apersepsiDanLiterasi: 'Guru membawa kotak misteri berisi boneka kucing bersuara "Meong", mengajak anak menebak dan berdialog interaktif tentang kucing peliharaan di rumah.',
      gerakLaguFisik: 'Gerak lagu aktif "Kucing belang tiga sungguh manis rupanya, meong-meong bunyinya tanda lapar perutnya" sambil melompat riang.',
      waktu: '07.30 - 08.00 (30 Menit)'
    },
    kegiatanInti: [
      {
        id: 'act-1',
        nama: 'Membangun Rumah & Kandang Kucing Impian',
        area: 'Main Balok',
        alatBahan: 'Balok kayu aneka bentuk, loose parts kayu ranting, miniatur kucing plastik, alas karpet rumput sintetis',
        langkah: 'Anak mendiskusikan rancangan kandang bersama pasangan, memilih balok dasar untuk pondasi, menyusun pilar dinding dan atap segitiga, lalu meletakkan miniatur kucing di dalamnya.',
        tujuanTerkait: 'Melatih kemampuan spasial, perencanaan, dan kerja sama gotong royong.',
        teknikAsesmen: 'Ceklis & Dokumentasi Foto Hasil Karya'
      },
      {
        id: 'act-2',
        nama: 'Membuat Topeng Wajah Kucing Ceria',
        area: 'Main Seni & Kreativitas',
        alatBahan: 'Piring kertas tebal, cat air aman, spons bulat, stik kayu, lem kertas, kertas origami untuk telinga runcing, benang wol untuk kumis',
        langkah: 'Anak memilih warna cat yang disukai, mencap piring kertas, menempel telinga segitiga, menempel 3 helai benang wol di kanan-kiri sebagai kumis, dan memasang pegangan stik.',
        tujuanTerkait: 'Mengembangkan motorik halus, estetika seni, dan koordinasi jari jemari.',
        teknikAsesmen: 'Hasil Karya & Catatan Anekdot'
      },
      {
        id: 'act-3',
        nama: 'Sensori Menemukan Jejak & Ikan Kesukaan Kucing',
        area: 'Main Sensorimotor',
        alatBahan: 'Baki baki sensori berisi beras warna-warni, jepitan penjepit makanan anak, kartu bergambar ikan 1-5, mangkuk warna',
        langkah: 'Anak menggunakan jepitan capit untuk mengambil ikan kayu di dalam beras sensori, lalu menghitungnya ke dalam mangkuk sesuai angka pada kartu tantangan.',
        tujuanTerkait: 'Kekuatan genggaman jari (finger-grip), konsentrasi, dan konsep dasar keaksaraan/angka awal.',
        teknikAsesmen: 'Ceklis Capaian Literasi & STEAM'
      },
      {
        id: 'act-4',
        nama: 'Bermain Peran Menjadi Dokter Kucing & Pemilik Sayang',
        area: 'Main Peran',
        alatBahan: 'Jas dokter mini, stetoskop mainan, perban kain, mangkuk makan kucing, sisir bulu mainan, buku resep dokter',
        langkah: 'Anak bergantian menjadi dokter hewan dan pemilik kucing. Memeriksa detak jantung boneka kucing, mengelus dengan lembut, dan memberi vitamin pura-pura.',
        tujuanTerkait: 'Mengasah empati sosial emosional, komunikasi dua arah, dan regulasi peran.',
        teknikAsesmen: 'Catatan Anekdot Interaksi Sosial'
      }
    ],
    istirahatMakan: {
      sopCuciTangan: 'Antre berbaris tertib di wastafel, membasuh tangan dengan sabun berbusa selama 20 detik, mengeringkan dengan serbet bersih.',
      doaMakanDanBekal: 'Duduk melingkar di karpet, membaca doa sebelum makan, membuka wadah bekal sendiri, makan dengan tangan kanan tanpa berserakan.',
      mainBebasMotorik: 'Bermain bebas di playground luar (ayunan, perosotan, jembatan gantung) dengan pengawasan guru.',
      waktu: '09.30 - 10.15 (45 Menit)'
    },
    kegiatanPenutup: {
      recallingDanRefleksi: 'Guru mengajak anak berkumpul kembali di karpet bundar, memperlihatkan topeng kucing buatan anak, menanyakan: "Kegiatan apa yang paling membuatmu senang hari ini?"',
      pesanKebaikanMoral: 'Guru berpesan untuk selalu menyayangi hewan ciptaan Tuhan, tidak boleh menendang atau menyakiti kucing jalanan yang lapar.',
      doaPenutupDanSalam: 'Membaca doa penutup majelis, doa naik kendaraan, doa perlindungan, bersalaman dengan guru dengan santun.',
      infoKegiatanBesok: 'Besok kita akan bereksplorasi tentang "Kelinci yang Suka Melompat dan Makan Wortel Manis!". Bawa wortel dari rumah ya teman-teman!',
      waktu: '10.15 - 10.30 (15 Menit)'
    },
    mediaSumberBelajar: [
      'Buku Cerita Bergambar "Kucing Milo yang Pemberani" karya Kak Nurul',
      'Video edukasi pendek tentang cara merawat anak kucing',
      'Kartu gambar aneka ekspresi kucing'
    ],
    teknikAsesmen: [
      'Ceklis Skala Nilai (BB, MB, BSH, BSB)',
      'Catatan Anekdot Harian Guru',
      'Dokumentasi Portofolio Foto Hasil Karya'
    ],
    catatanGuru: 'Alhamdulillah seluruh anak antusias, terutama Rayyan yang awalnya pemalu hari ini sangat berani memakai topeng kucing dan bersuara meong.'
  }
];

export const initialBankActivities: BankActivityItem[] = [
  // Diriku
  {
    id: 'bank-1',
    tema: 'Diriku',
    subTema: 'Anggota Tubuh',
    kelompok: 'Semua',
    area: 'Main Seni & Kreativitas',
    namaKegiatan: 'Menjiplak & Menghias Telapak Tangan Pelangi',
    alatBahan: 'Kertas karton putih, krayon warna-warni, glitter aman, lem kertas',
    tujuan: 'Mengenal anatomi 5 jari tangan dan mengekspresikan warna favorit',
    langkah: 'Letakkan tangan anak di atas kertas, arahkan menjiplak dengan krayon, warnai tiap jari dengan warna berbeda.',
    asesmenTerkait: 'Hasil karya dan ketepatan koordinasi motorik halus.'
  },
  {
    id: 'bank-2',
    tema: 'Diriku',
    subTema: 'Identitasku',
    kelompok: 'A',
    area: 'Literasi & STEAM',
    namaKegiatan: 'Menyusun Huruf Nama Sendiri dengan Kerikil Berwarna',
    alatBahan: 'Kartu pola nama anak, kerikil hias warna, baki baki kecil',
    tujuan: 'Mengenali simbol huruf awal pada nama panggilannya',
    langkah: 'Anak mengambil kerikil satu per satu, menaruhnya mengikuti garis bentuk huruf namanya.',
    asesmenTerkait: 'Ceklis Keaksaraan Awal'
  },
  {
    id: 'bank-3',
    tema: 'Diriku',
    subTema: 'Pancaindra',
    kelompok: 'Semua',
    area: 'Main Sensorimotor',
    namaKegiatan: 'Tebak Rasa Ajaib (Manis, Asin, Asam, Gurih)',
    alatBahan: 'Madu, garam sedikit, potongan jeruk nipis, biskuit keju, sendok kecil',
    tujuan: 'Mengeksplorasi fungsi lidah sebagai indra pengecap',
    langkah: 'Mata anak ditutup dengan kain lembut, mencicipi sedikit rasa, lalu menebak namanya.',
    asesmenTerkait: 'Catatan Anekdot rasa ingin tahu'
  },
  {
    id: 'bank-4',
    tema: 'Diriku',
    subTema: 'Kesehatan Diri',
    kelompok: 'Semua',
    area: 'Main Peran',
    namaKegiatan: 'Praktik Sikat Gigi Raksasa Bersama Boneka Dinosaurus',
    alatBahan: 'Model gigi tiruan besar, sikat gigi bersih, pasta gigi rasa buah, air kumur',
    tujuan: 'Membiasakan cara menggosok gigi memutar yang benar',
    langkah: 'Guru mendemonstrasikan gerakan memutar, anak bergiliran menyikat gigi boneka secara berurutan.',
    asesmenTerkait: 'Ceklis Kemandirian Merawat Diri'
  },
  // Binatang
  {
    id: 'bank-5',
    tema: 'Binatang Sahabat Kita',
    subTema: 'Binatang Air',
    kelompok: 'Semua',
    area: 'Main Sensorimotor',
    namaKegiatan: 'Memancing Ikan Magnet & Menghitung Tangkapan',
    alatBahan: 'Kolam plastik tiup, ikan kertas laminasi berklip kertas, joran magnet, ember kecil',
    tujuan: 'Melatih konsentrasi, koordinasi tangan-mata, dan membilang 1-10',
    langkah: 'Anak mengarahkan ujung joran magnet ke mulut ikan, mengangkatnya ke ember, lalu menghitung bersama.',
    asesmenTerkait: 'Ceklis Literasi & STEAM'
  },
  {
    id: 'bank-6',
    tema: 'Binatang Sahabat Kita',
    subTema: 'Binatang Ternak',
    kelompok: 'B',
    area: 'Main Balok',
    namaKegiatan: 'Merancang Peternakan Sapi & Pagar Padang Rumput',
    alatBahan: 'Balok kayu hollow, miniatur sapi dan kambing, potongan kain flanel hijau, pagar mainan',
    tujuan: 'Mengenal tata ruang, konsep tertutup-terbuka, dan merawat hewan ternak',
    langkah: 'Anak berkolaborasi membuat peternakan dengan gerbang masuk, kandang berteduh, dan area makan rumput.',
    asesmenTerkait: 'Hasil Karya Spasial Balok'
  },
  {
    id: 'bank-7',
    tema: 'Binatang Sahabat Kita',
    subTema: 'Serangga',
    kelompok: 'A',
    area: 'Main Seni & Kreativitas',
    namaKegiatan: 'Kolase Sayap Kupu-kupu dari Daun Kering yang Gugur',
    alatBahan: 'Pola kertas kupu-kupu, aneka daun kering aneka ukuran, lem fox, glitter emas',
    tujuan: 'Menghargai keindahan ciptaan Tuhan melalui bahan alam lepasan (loose parts)',
    langkah: 'Anak memilih daun kering di halaman, menyusun simetri sayap kiri dan kanan, lalu menempelkannya rapi.',
    asesmenTerkait: 'Hasil Karya & Estetika'
  },
  {
    id: 'bank-8',
    tema: 'Binatang Sahabat Kita',
    subTema: 'Burung & Unggas',
    kelompok: 'Semua',
    area: 'Main Sensorimotor',
    namaKegiatan: 'Membuat Sarang Burung dari Jerami & Telur Plastisin',
    alatBahan: 'Mangkuk anyaman mini, serabut jerami / daun pinus, playdough aneka warna',
    tujuan: 'Mengenal tempat tinggal burung dan melatih gerakan meremas/memilin plastisin',
    langkah: 'Anak menata jerami menjadi sarang bulat, lalu memilin plastisin menjadi 3 butir telur mungil.',
    asesmenTerkait: 'Keterampilan Motorik Halus'
  },
  // Tanaman
  {
    id: 'bank-9',
    tema: 'Tanaman Ceria & Subur',
    subTema: 'Tanaman Buah',
    kelompok: 'Semua',
    area: 'Main Seni & Kreativitas',
    namaKegiatan: 'Mengecap Bentuk Bunga Menggunakan Batang Sawi & Belimbing',
    alatBahan: 'Batang sawi dipotong, belimbing bintang, piring cat akrilik washable, kertas gambar A4',
    tujuan: 'Melihat pola alamiah tanaman dan menghasilkan motif kain jumputan sederhana',
    langkah: 'Celupkan ujung potongan sayur ke dalam cat, tempelkan ke kertas dengan tekanan pas, amati bentuk bunganya.',
    asesmenTerkait: 'Hasil Karya Seni Visual'
  },
  {
    id: 'bank-10',
    tema: 'Tanaman Ceria & Subur',
    subTema: 'Menanam Biji',
    kelompok: 'Semua',
    area: 'Literasi & STEAM',
    namaKegiatan: 'Sains Biji Kacang Hijau di Rumah Kaca Plastik Kapas',
    alatBahan: 'Gelas plastik bening, kapas basah, biji kacang hijau pilihan, spidol nama',
    tujuan: 'Mengamati pertumbuhan kecambah dan menumbuhkan rasa tanggung jawab menyiram',
    langkah: 'Anak meletakkan kapas lembap, menaruh 5 butir biji, memberi label nama, dan menaruhnya dekat jendela.',
    asesmenTerkait: 'Catatan Anekdot Nalar Kritis'
  },
  // Transportasi & Profesi
  {
    id: 'bank-11',
    tema: 'Kendaraan & Transportasi',
    subTema: 'Kendaraan Darat',
    kelompok: 'Semua',
    area: 'Main Balok',
    namaKegiatan: 'Membangun Jalur Kereta Api & Stasiun Ceria',
    alatBahan: 'Rel kayu mainan, gerbong kereta magnetik, balok jembatan, plang sinyal',
    tujuan: 'Memahami kesinambungan jalur sirkuit rel kereta dan konsep antrean penumpang',
    langkah: 'Merakit rel menjadi lingkaran tertutup, memasang peron stasiun dan loket tiket sederhana.',
    asesmenTerkait: 'Literasi & STEAM Konstruksi'
  },
  {
    id: 'bank-12',
    tema: 'Pekerjaan & Cita-citaku',
    subTema: 'Koki & Chef',
    kelompok: 'Semua',
    area: 'Main Peran',
    namaKegiatan: 'Restoran Cilik & Menghias Roti Tawar Menjadi Wajah Panda',
    alatBahan: 'Topi koki cilik, roti tawar gandum, selai cokelat di pipping bag, irisan pisang, kismis',
    tujuan: 'Melatih kreativitas kuliner, higienitas mencuci tangan, dan berbagi makanan',
    langkah: 'Anak mengoles selai, meletakkan irisan pisang untuk mata dan telinga, meletakkan kismis untuk hidung panda.',
    asesmenTerkait: 'Kemandirian & Kemampuan Motorik'
  },
  // Alam Semesta & Sains
  {
    id: 'bank-13',
    tema: 'Alam Semesta & Gejala Alam',
    subTema: 'Pelangi Indah',
    kelompok: 'Semua',
    area: 'Literasi & STEAM',
    namaKegiatan: 'Percobaan Pelangi Berjalan dengan Tisu & Gelas Warna',
    alatBahan: '6 gelas bening, air, pewarna makanan (Merah, Kuning, Biru), gulungan tisu dapur',
    tujuan: 'Mengamati kapilaritas air dan percampuran warna sekunder (hijau, ungu, jingga)',
    langkah: 'Susun gelas bergantian isi air berwarna dan kosong, sambungkan dengan jembatan tisu, saksikan air merambat.',
    asesmenTerkait: 'Nalar Kritis Sains STEAM'
  },
  {
    id: 'bank-14',
    tema: 'Alam Semesta & Gejala Alam',
    subTema: 'Siang dan Malam',
    kelompok: 'Semua',
    area: 'Main Sensorimotor',
    namaKegiatan: 'Kotak Sensori Bintang Gelap dengan Lampu Senter & Fosfor',
    alatBahan: 'Kardus hitam tertutup, lubang intip, bintang fosfor menyala, senter mini, batu hitam',
    tujuan: 'Membedakan suasana gelap malam dan terang siang, serta kekaguman pada bintang',
    langkah: 'Anak mengintip ke dalam kotak gelap, menyalakan senter untuk melihat bintang bersinar.',
    asesmenTerkait: 'Catatan Anekdot Rasa Takjub'
  }
];

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    nisn: '3201098711',
    namaLengkap: 'Muhammad Rayyan Al-Fatih',
    namaPanggilan: 'Rayyan',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Depok, 14 Februari 2021',
    kelompok: 'A',
    namaAyah: 'Ahmad Fauzi, S.T.',
    namaIbu: 'dr. Sarah Nabila',
    pekerjaanOrtu: 'Karyawan Swasta / Dokter',
    alamat: 'Jl. Anggrek Indah No. 45, Cimanggis, Depok',
    teleponOrtu: '0812-9876-5432',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rayyan&backgroundColor=b6e3f4'
  },
  {
    id: 'std-2',
    nisn: '3201098712',
    namaLengkap: 'Aisyah Putri Humaira',
    namaPanggilan: 'Aisyah',
    jenisKelamin: 'Perempuan',
    tempatTanggalLahir: 'Jakarta, 22 April 2021',
    kelompok: 'A',
    namaAyah: 'Rahmat Hidayat, M.Kom',
    namaIbu: 'Nur Laila, S.Pd',
    pekerjaanOrtu: 'Dosen / Wirausaha',
    alamat: 'Jl. Mawar Asri Blok C No. 10, Sukamaju',
    teleponOrtu: '0813-8899-7711',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aisyah&backgroundColor=ffdfbf'
  },
  {
    id: 'std-3',
    nisn: '3201098713',
    namaLengkap: 'Kenzo Alvaro Pratama',
    namaPanggilan: 'Kenzo',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Bogor, 10 Juni 2021',
    kelompok: 'A',
    namaAyah: 'Budi Santoso',
    namaIbu: 'Ratna Dewi',
    pekerjaanOrtu: 'Wiraswasta / Ibu Rumah Tangga',
    alamat: 'Jl. Ceria Makmur No. 8, Depok',
    teleponOrtu: '0857-1234-5678',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kenzo&backgroundColor=c0aede'
  },
  {
    id: 'std-4',
    nisn: '3201098714',
    namaLengkap: 'Kirana Salsabila Anindya',
    namaPanggilan: 'Kirana',
    jenisKelamin: 'Perempuan',
    tempatTanggalLahir: 'Depok, 05 Juli 2021',
    kelompok: 'A',
    namaAyah: 'Hendro Wijaya, S.E.',
    namaIbu: 'Maya Kusuma',
    pekerjaanOrtu: 'Manajer Bank / Guru Kursus',
    alamat: 'Perumahan Bukit Ceria Blok D-14',
    teleponOrtu: '0812-4455-6677',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kirana&backgroundColor=ffd5dc'
  },
  {
    id: 'std-5',
    nisn: '3201098715',
    namaLengkap: 'Fathan Malik Ibrahim',
    namaPanggilan: 'Fathan',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Depok, 18 September 2021',
    kelompok: 'A',
    namaAyah: 'Ibrahim Rasyid',
    namaIbu: 'Dewi Lestari',
    pekerjaanOrtu: 'PNS Pemkot / Notaris',
    alamat: 'Jl. Kenanga Lestari No. 22',
    teleponOrtu: '0878-9900-1122',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Fathan&backgroundColor=d1d4f9'
  },
  // Kelompok B
  {
    id: 'std-6',
    nisn: '3201087621',
    namaLengkap: 'Nafisah Zahra Qonita',
    namaPanggilan: 'Zahra',
    jenisKelamin: 'Perempuan',
    tempatTanggalLahir: 'Depok, 03 Januari 2020',
    kelompok: 'B',
    namaAyah: 'Muhammad Ridwan, S.Ag',
    namaIbu: 'Umi Kalsum',
    pekerjaanOrtu: 'Guru PAI / Wiraswasta',
    alamat: 'Jl. Dahlia Hijau No. 17',
    teleponOrtu: '0813-1122-3344',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zahra&backgroundColor=ffdfbf'
  },
  {
    id: 'std-7',
    nisn: '3201087622',
    namaLengkap: 'Rafa Raditya Nugroho',
    namaPanggilan: 'Rafa',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Jakarta, 19 Maret 2020',
    kelompok: 'B',
    namaAyah: 'Bambang Nugroho',
    namaIbu: 'Sri Rejeki',
    pekerjaanOrtu: 'TNI AL / Apoteker',
    alamat: 'Komplek Griya Sukamaju Blok A-3',
    teleponOrtu: '0812-7788-9900',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rafa&backgroundColor=b6e3f4'
  },
  {
    id: 'std-8',
    nisn: '3201087623',
    namaLengkap: 'Syifa Nadira Az-Zahra',
    namaPanggilan: 'Syifa',
    jenisKelamin: 'Perempuan',
    tempatTanggalLahir: 'Depok, 29 Mei 2020',
    kelompok: 'B',
    namaAyah: 'dr. Faisal Rahman, Sp.A',
    namaIbu: 'Dian Permatasari',
    pekerjaanOrtu: 'Dokter Spesialis Anak / Arsitek',
    alamat: 'Jl. Cendrawasih Permai No. 12',
    teleponOrtu: '0815-6677-8899',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Syifa&backgroundColor=ffd5dc'
  },
  {
    id: 'std-9',
    nisn: '3201087624',
    namaLengkap: 'Gibran Rakha Al-Baqir',
    namaPanggilan: 'Gibran',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Depok, 12 Agustus 2020',
    kelompok: 'B',
    namaAyah: 'Surya Kencana',
    namaIbu: 'Fitri Handayani',
    pekerjaanOrtu: 'Insinyur Sipil / Desainer Grafis',
    alamat: 'Jl. Flamboyan Indah No. 5',
    teleponOrtu: '0821-3344-5566',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gibran&backgroundColor=c0aede'
  },
  {
    id: 'std-10',
    nisn: '3201087625',
    namaLengkap: 'Naura Jasmine Khairunnisa',
    namaPanggilan: 'Naura',
    jenisKelamin: 'Perempuan',
    tempatTanggalLahir: 'Bandung, 08 Oktober 2020',
    kelompok: 'B',
    namaAyah: 'Farhan Maulana',
    namaIbu: 'Anita Safitri',
    pekerjaanOrtu: 'Akuntan Publik / Konsultan',
    alamat: 'Perumahan Pesona Ceria No. 19',
    teleponOrtu: '0819-2233-4455',
    fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Naura&backgroundColor=d1d4f9'
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 't-1',
    nama: 'Dra. Hj. Sri Wahyuni, M.Pd',
    nip: '19760815 200212 2 003',
    jabatan: 'Kepala Sekolah',
    pendidikanTerakhir: 'S2 Magister Manajemen Pendidikan Anak Usia Dini',
    telepon: '0812-8877-6655',
    fotoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SriWahyuni&hair=hijab'
  },
  {
    id: 't-2',
    nama: 'Siti Nurhaliza, S.Pd',
    nip: '19890412 201503 2 005',
    jabatan: 'Guru Kelas A',
    pendidikanTerakhir: 'S1 PG-PAUD Universitas Negeri Jakarta',
    telepon: '0813-9988-7766',
    fotoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SitiNurhaliza&hair=hijab'
  },
  {
    id: 't-3',
    nama: 'Dewi Anggraeni, S.Pd',
    nip: '19921105 201902 2 007',
    jabatan: 'Guru Kelas B',
    pendidikanTerakhir: 'S1 PG-PAUD Universitas Pendidikan Indonesia',
    telepon: '0857-4433-2211',
    fotoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DewiAnggraeni&hair=hijab'
  }
];

export const initialAssessments: AssessmentRecord[] = [
  {
    id: 'asm-1',
    studentId: 'std-1', // Rayyan
    kelompok: 'A',
    tanggal: '2026-10-12',
    kegiatanNama: 'Membangun Rumah & Topeng Wajah Kucing',
    ratings: {
      agamaBudiPekerti: 'BSB',
      jatiDiri: 'BSH',
      literasiSteam: 'BSB',
      motorik: 'BSH',
      sosialEmosional: 'BSH',
      bahasa: 'BSB'
    },
    catatanAnekdot: 'Saat bermain balok membuat kandang kucing, Rayyan berinisiatif mengajak Kenzo berbagi balok atap segitiga. Rayyan juga dengan santun mengucapkan "terima kasih" ketika dibantu merapikan balok yang roboh.',
    hasilKarya: {
      namaKarya: 'Topeng Kucing Kuning Ceria',
      fotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Piring kertas dicat kuning dengan spons rapi, kumis 3 lembar simetris kanan kiri, telinga origami ditempel tegak.',
      analisisCapaian: 'Ananda Rayyan menunjukkan koordinasi motorik halus sangat baik dalam merekatkan helai kumis kucing.'
    },
    portofolio: 'Koleksi foto karya sentra balok dan seni menempel kumis kucing.'
  },
  {
    id: 'asm-2',
    studentId: 'std-2', // Aisyah
    kelompok: 'A',
    tanggal: '2026-10-12',
    kegiatanNama: 'Bermain Peran Dokter Kucing & Sensori Ikan',
    ratings: {
      agamaBudiPekerti: 'BSB',
      jatiDiri: 'BSB',
      literasiSteam: 'BSH',
      motorik: 'BSB',
      sosialEmosional: 'BSB',
      bahasa: 'BSB'
    },
    catatanAnekdot: 'Aisyah sangat fasih memerankan dokter hewan, memeriksa boneka kucing dengan stetoskop sambil berkata lembut: "Jangan takut ya meong, ini obatnya biar cepat sembuh". Menunjukkan empati tinggi.',
    hasilKarya: {
      namaKarya: 'Menata 5 Ikan Magnet ke Piring Bersih',
      fotoUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Berhasil menjepit 5 ikan kayu dari pasir sensori dan mengelompokkan warna merah-kuning.',
      analisisCapaian: 'Fokus tinggi, kekuatan jari jemari mantap.'
    }
  },
  {
    id: 'asm-3',
    studentId: 'std-3', // Kenzo
    kelompok: 'A',
    tanggal: '2026-10-12',
    kegiatanNama: 'Membangun Balok Kandang Kucing',
    ratings: {
      agamaBudiPekerti: 'BSH',
      jatiDiri: 'MB',
      literasiSteam: 'BSB',
      motorik: 'BSH',
      sosialEmosional: 'MB',
      bahasa: 'BSH'
    },
    catatanAnekdot: 'Kenzo awalnya enggan menunggu giliran mengambil balok tinggi, namun setelah diarahkan Ibu Guru Siti dengan kalimat penenang, Kenzo mampu tersenyum dan menunggu giliran dengan tertib.',
    hasilKarya: {
      namaKarya: 'Kandang Kucing Menara 6 Tingkat',
      fotoUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Balok persegi panjang disusun vertikal membentuk benteng dengan pintu gerbang lebar.',
      analisisCapaian: 'Konsep keseimbangan dan gravitasi sangat menonjol.'
    }
  },
  {
    id: 'asm-4',
    studentId: 'std-6', // Zahra (Kelompok B)
    kelompok: 'B',
    tanggal: '2026-10-14',
    kegiatanNama: 'Menulis Huruf K-U-C-I-N-G & Kolase Daun',
    ratings: {
      agamaBudiPekerti: 'BSB',
      jatiDiri: 'BSB',
      literasiSteam: 'BSB',
      motorik: 'BSB',
      sosialEmosional: 'BSB',
      bahasa: 'BSB'
    },
    catatanAnekdot: 'Zahra dengan mandiri membantu membagikan lem kertas ke meja teman-temannya tanpa diminta. Saat berdoa, bacaan doa makan dan sebelum belajarnya terdengar tartil dan khusyuk.',
    hasilKarya: {
      namaKarya: 'Kolase Sayap Kupu-kupu Daun Nangka',
      fotoUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Daun dipotong rapi menggunakan gunting, disusun membentuk sayap dengan garis urat daun simetris.',
      analisisCapaian: 'Kerapian dan ketelitian motorik halus sangat berkembang pesat.'
    }
  }
];

export const initialRaportList: RaportNarrative[] = [
  {
    studentId: 'std-1',
    semester: 'Ganjil',
    tahunAjaran: '2026/2027',
    narasiAgamaBudiPekerti: 'Alhamdulillah, ananda Rayyan menunjukkan perkembangan yang SANGAT BAIK (BSB) pada aspek Nilai Agama dan Budi Pekerti. Rayyan terbiasa melafalkan doa sebelum dan sesudah kegiatan belajar, mengucap salam saat tiba di sekolah dengan santun, serta memiliki rasa kasih sayang yang tulus terhadap tanaman sekolah dan binatang ciptaan Allah SWT.',
    narasiJatiDiri: 'Pada aspek Jati Diri, ananda Rayyan BERKEMBANG SESUAI HARAPAN (BSH). Rayyan telah mampu merawat kebersihan diri dengan mencuci tangan memakai sabun secara berurutan, mandiri merapikan sepatu di loker, serta menunjukkan rasa bangga saat memperlihatkan hasil karya ciptaannya di hadapan teman-teman sekelas.',
    narasiLiterasiSteam: 'Kemampuan Literasi dan STEAM Rayyan BERKEMBANG SANGAT BAIK (BSB). Ananda sangat antusias dalam kegiatan investigasi sains, mampu mengelompokkan benda berdasarkan warna dan ukuran, serta mahir menyusun pola balok rancang bangun bertingkat yang seimbang. Rayyan juga mulai mengenali huruf awal pada namanya dengan tepat.',
    narasiMotorik: 'Perkembangan Motorik Rayyan BERKEMBANG SESUAI HARAPAN (BSH). Gerakan motorik kasar seperti melompat dengan satu kaki, menangkap bola besar, dan meniti papan titian dilakukan dengan lincah dan berani. Pada motorik halus, koordinasi memegang gunting anak dan menjepit dengan pinset sudah semakin mantap dan presisi.',
    narasiSosialEmosional: 'Pada perkembangan Sosial Emosional, Rayyan BERKEMBANG SESUAI HARAPAN (BSH). Rayyan mampu mengantre menunggu giliran main, menunjukkan empati ketika ada teman yang bersedih, serta senang diajak bekerja sama dalam kelompok sentra balok.',
    narasiBahasa: 'Kemampuan Bahasa Rayyan BERKEMBANG SANGAT BAIK (BSB). Rayyan memiliki perbendaharaan kata yang kaya, mampu menceritakan kembali dongeng sederhana yang dibacakan guru dengan runtut, dan berani mengutarakan pendapat atau keinginannya menggunakan kalimat santun.',
    proyekP5: {
      judul: 'Aku Sayang Bumi: Memilah Sampah & Menanam Bibit Sayur Bayam',
      deskripsi: 'Rayyan aktif dalam rangkaian proyek menanam bayam di pot daur ulang botol mineral, tekun menyiram setiap pagi, dan mampu membedakan sampah daun organik dan bungkus plastik anorganik.',
      capaian: 'Sangat Baik (Menunjukkan perilaku peduli lingkungan secara konsisten)'
    },
    pertumbuhanFisik: {
      tinggiBadan: 106.5,
      beratBadan: 17.8,
      lingkarKepala: 50.2,
      kesehatanGigi: 'Gigi bersih dan terawat, tidak ada karies berlubang.',
      statusGizi: 'Gizi Baik & Sangat Sehat (Sesuai Kurva Pertumbuhan WHO/Kemenkes)'
    },
    kehadiran: {
      sakit: 1,
      izin: 0,
      tanpaKeterangan: 0
    },
    refleksiGuru: 'Ananda Rayyan adalah murid yang cerdas, memiliki rasa ingin tahu yang tinggi, serta santun dalam bersikap. Kehadiran Rayyan selalu membawa keceriaan dan semangat bagi kelas A.',
    saranOrangTua: 'Diharapkan orang tua di rumah terus membiasakan membacakan buku cerita bergambar sebelum tidur dan mengajak Rayyan berdialog tentang aktivitas hariannya untuk memperkaya daya imajinasinya.',
    tempatTanggalRapor: 'Depok, 18 Desember 2026',
    tandaTangan: {
      guruKelas: 'Siti Nurhaliza, S.Pd',
      kepalaSekolah: 'Dra. Hj. Sri Wahyuni, M.Pd'
    }
  }
];

export const initialJournals: DailyTeacherJournal[] = [
  {
    id: 'jrn-1',
    tanggal: '2026-10-12',
    kelompok: 'A',
    guruNama: 'Siti Nurhaliza, S.Pd',
    kegiatanTerlaksana: 'Melaksanakan RPPH Tema Binatang Kucing: Membuat topeng piring kertas, menirukan gerak kucing, sentra balok kandang kucing, dan makan bekal sehat bersama.',
    kendalaHambatan: 'Sebagian lem kertas cair tumpah di meja kelompok 2 saat anak-anak berebut menempel kumis wol.',
    solusiTindakLanjut: 'Besok menyediakan lem stik padat (glue stick) per meja agar tidak tumpah dan mengajarkan pembagian peran mengambil bahan main bergantian.',
    catatanSiswaKhusus: 'Kenzo butuh pendampingan ekstra saat transisi dari main balok ke cuci tangan.',
    fotoDokumentasi: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'jrn-2',
    tanggal: '2026-10-13',
    kelompok: 'A',
    guruNama: 'Siti Nurhaliza, S.Pd',
    kegiatanTerlaksana: 'Eksplorasi sensorimotor meronce sedotan dan berburu miniatur ikan magnet. Senam pagi ceria di halaman sekolah.',
    kendalaHambatan: 'Cuaca sempat gerimis ringan saat senam pagi.',
    solusiTindakLanjut: 'Senam dipindahkan ke selasar aula depan kelas, anak-anak tetap ceria bersemangat.',
    catatanSiswaKhusus: 'Aisyah sangat mandiri dan membantu temannya yang tali sepatunya terlepas.'
  }
];
