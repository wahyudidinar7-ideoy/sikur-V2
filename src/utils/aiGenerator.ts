import { GoogleGenAI } from '@google/genai';
import { RpphItem, ClassType, SemesterType, AssessmentRecord, Student, RaportNarrative, AssessmentRating } from '../types';

export interface GenerateRpphParams {
  kelompok: ClassType;
  semester: SemesterType;
  mingguKe: number;
  hari: string;
  tanggal: string;
  tema: string;
  subTema: string;
  subSubTema: string;
}

// Preset library for instant offline generation
const THEME_PRESETS: Record<string, {
  tujuan: string[];
  pembuka: { salam: string; apersepsi: string; gerak: string };
  kegiatan: {
    nama: string;
    area: 'Main Balok' | 'Main Peran' | 'Main Sensorimotor' | 'Main Seni & Kreativitas' | 'Literasi & STEAM';
    alatBahan: string;
    langkah: string;
    tujuan: string;
    asesmen: string;
  }[];
  penutup: { refleksi: string; pesan: string; besok: string };
}> = {
  'binatang': {
    tujuan: [
      'Menyayangi binatang sebagai makhluk hidup ciptaan Tuhan',
      'Mengenal ciri fisik, makanan, dan habitat binatang',
      'Mengembangkan motorik halus melalui kreasi seni bertema hewan',
      'Melatih kerja sama dan kesabaran saat bermain sentra balok dan peran'
    ],
    pembuka: {
      salam: 'Penyambutan ramah anak 5S, berbaris tertib, membaca doa sebelum belajar dan surat pendek pilihan.',
      apersepsi: 'Tebak suara binatang di kotak misteri dan mendengarkan dongeng interaktif fabel binatang cerdik.',
      gerak: 'Senam kelinci melompat dan menirukan kepakan sayap burung dengan iringan musik riang.'
    },
    kegiatan: [
      {
        nama: 'Rancang Bangun Miniatur Kebun Binatang Ceria',
        area: 'Main Balok',
        alatBahan: 'Balok kayu aneka geometri, miniatur hewan karet, rumput flanel, pagar mainan',
        langkah: 'Anak merancang zona hewan jinak dan hewan buas, membuat kandang bersekat, dan memasang gerbang masuk.',
        tujuan: 'Mengembangkan nalar spasial, klasifikasi, dan kerja sama gotong royong.',
        asesmen: 'Ceklis STEAM & Hasil Karya Rancang Bangun'
      },
      {
        nama: 'Bermain Peran Dokter Hewan & Klinik Satwa',
        area: 'Main Peran',
        alatBahan: 'Jas putih dokter cilik, stetoskop mainan, perban kain, botol obat mainan, buku pasien',
        langkah: 'Anak bergantian menjadi dokter yang memeriksa boneka hewan sakit dan pemilik yang menyayangi hewan.',
        tujuan: 'Melatih empati sosial emosional, komunikasi verbal, dan kosakata baru.',
        asesmen: 'Catatan Anekdot Sikap Empati'
      },
      {
        nama: 'Sensori Berburu Jejak & Menghitung Ikan di Pasir Kinetik',
        area: 'Main Sensorimotor',
        alatBahan: 'Baki baki pasir kinetik, stempel jejak kaki hewan, miniatur ikan, capit makanan anak',
        langkah: 'Anak mencap jejak kaki di pasir, menjepit ikan tersembunyi, dan mengelompokkannya sesuai angka tantangan 1-5.',
        tujuan: 'Kekuatan jemari pincer-grasp dan konsep pra-matematika membilang.',
        asesmen: 'Ceklis Keterampilan Motorik & Literasi STEAM'
      },
      {
        nama: 'Kolase Sayap Kupu-kupu dari Daun Kering Loose Parts',
        area: 'Main Seni & Kreativitas',
        alatBahan: 'Pola gambar kupu-kupu, daun kering aneka ukuran, lem kertas, krayon pastel',
        langkah: 'Anak memilih daun kering di halaman, menyusun simetri sayap kupu-kupu, dan menempelnya dengan rapi.',
        tujuan: 'Kreativitas seni visual dan penghargaan terhadap material alam ciptaan Tuhan.',
        asesmen: 'Hasil Karya Seni'
      }
    ],
    penutup: {
      refleksi: 'Recalling lingkaran: anak menceritakan hewan favoritnya dan bagian bermain yang paling menyenangkan.',
      pesan: 'Pesan moral: Selalu memberi makan dan tidak menyakiti hewan peliharaan di rumah.',
      besok: 'Info esok hari: Mengenal hewan laut dan membawa kerang hias jika punya.'
    }
  },
  'tanaman': {
    tujuan: [
      'Bersyukur kepada Tuhan atas tanaman buah, sayur, dan bunga yang bermanfaat',
      'Mengenal bagian tanaman (akar, batang, daun, bunga, buah) melalui pengamatan langsung',
      'Praktik merawat tanaman dengan menyiram dan menyiangi gulma',
      'Melatih estetika seni dengan memanfaatkan pewarna alami dan cap sayuran'
    ],
    pembuka: {
      salam: 'Senyum, sapa, salam, doa belajar, dan membaca selawat/doa kesehatan.',
      apersepsi: 'Mengamati tanaman hidup yang dibawa guru ke kelas dan meraba tekstur daun kasar dan halus.',
      gerak: 'Gerak lagu "Lihat Kebunku Penuh dengan Bunga" dengan gerakan melambai seperti pohon tertiup angin.'
    },
    kegiatan: [
      {
        nama: 'Eksperimen Menanam Biji Kecambah di Kapas Basah',
        area: 'Literasi & STEAM',
        alatBahan: 'Gelas transparan, kapas basah, biji kacang hijau, semprotan air mini',
        langkah: 'Anak menata kapas lembap di dasar gelas, menaruh 5 butir biji, memberi label nama, dan menyemprotkan air.',
        tujuan: 'Menumbuhkan daya nalar ilmiah, observasi perubahan, dan tanggung jawab.',
        asesmen: 'Catatan Anekdot Sikap Ilmiah'
      },
      {
        nama: 'Mengecap Motif Bunga dengan Batang Sayur Sawi & Belimbing',
        area: 'Main Seni & Kreativitas',
        alatBahan: 'Potongan batang sawi, belimbing iris bintang, cat air warna-warni, kertas gambar tebal',
        langkah: 'Mencelupkan penampang potongan sawi ke cat warna, lalu menekannya di kertas hingga membentuk kuntum mawar.',
        tujuan: 'Koordinasi motorik halus dan eksplorasi pola cetak alami.',
        asesmen: 'Hasil Karya Seni Visual'
      },
      {
        nama: 'Bermain Peran Pasar Buah & Toko Jus Segar',
        area: 'Main Peran',
        alatBahan: 'Replika aneka buah plastik, timbangan mainan, keranjang belanja, uang kertas mainan',
        langkah: 'Anak bergantian menjadi penjual buah ramah dan pembeli yang memilih buah segar serta menimbangnya.',
        tujuan: 'Literasi numerasi (menimbang, menghitung uang) dan keterampilan interaksi sosial.',
        asesmen: 'Catatan Anekdot Bahasa & Sosial Emosional'
      },
      {
        nama: 'Rancang Bangun Rumah Kaca & Taman Bunga Sekolah',
        area: 'Main Balok',
        alatBahan: 'Balok transparan mika, balok kayu natural, miniatur bunga plastik, stik es krim',
        langkah: 'Menyusun balok menjadi bangunan pembibitan tanaman bertingkat dengan pagar bunga warna-warni.',
        tujuan: 'Konsep keseimbangan dan kreativitas rancang bangun arsitektur.',
        asesmen: 'Hasil Karya Konstruksi'
      }
    ],
    penutup: {
      refleksi: 'Anak memperlihatkan hasil cap bunga dan menceritakan sayur atau buah kesukaannya.',
      pesan: 'Pesan moral: Rajin makan sayur dan buah setiap hari agar badan sehat kuat.',
      besok: 'Info esok hari: Praktik memotong buah pisang dengan pisau plastik dan membuat sate buah sehat.'
    }
  },
  'kendaraan': {
    tujuan: [
      'Mengenal jenis kendaraan darat, laut, dan udara serta fungsinya',
      'Mengenal aturan keselamatan berlalu lintas sederhana dan rambu jalan',
      'Mengembangkan imajinasi dan koordinasi fisik motorik melalui permainan transportasi'
    ],
    pembuka: {
      salam: 'Penyambutan penuh kehangatan, doa belajar, dan doa naik kendaraan darat/laut.',
      apersepsi: 'Tebak suara kendaraan (klakson mobil "tin-tin", bel kereta "tut-tut-tut", sirine pemadam).',
      gerak: 'Permainan gerak lampu lalu lintas: Merah berhenti mematung, Kuning siap-siap jalan di tempat, Hijau melangkah riang.'
    },
    kegiatan: [
      {
        nama: 'Membangun Sirkuit Kota & Jalur Rel Kereta Cepat',
        area: 'Main Balok',
        alatBahan: 'Balok unit kayu, jalur rel kayu magnetik, miniatur rambu lampu merah, mobil-mobilan',
        langkah: 'Anak berkolaborasi menghubungkan rel membentuk lingkaran besar, menambahkan terowongan dan jembatan flyover.',
        tujuan: 'Pemahaman konsep sirkuit tertutup, elevasi jembatan, dan kerja sama tim.',
        asesmen: 'Hasil Karya Rancang Bangun Balok'
      },
      {
        nama: 'Melipat Kertas Origami Menjadi Pesawat Terbang Ceria',
        area: 'Main Seni & Kreativitas',
        alatBahan: 'Kertas origami aneka warna, spidol untuk menghias jendela kabin, garis landasan pacu',
        langkah: 'Anak mengikuti arahan guru melipat sudut segitiga, melipat sayap, dan menerbangkannya di landasan karpet.',
        tujuan: 'Ketepatan lipatan jari (fine-motor), ketahanan fokus, dan uji coba aerodinamika sederhana.',
        asesmen: 'Ceklis Motorik Halus'
      },
      {
        nama: 'Bermain Peran Masinis & Loket Tiket Stasiun Kereta Api',
        area: 'Main Peran',
        alatBahan: 'Kursi berjejer seperti gerbong, topi masinis, peluit, kartu tiket berlubang, stempel',
        langkah: 'Anak memegang tiket, mengantre tertib masuk gerbong, dan bernyanyi "Naik Kereta Api" bersama.',
        tujuan: 'Mengenal konsep antre tertib, peran sosial, dan aturan umum fasilitas publik.',
        asesmen: 'Catatan Anekdot Sosial Emosional'
      },
      {
        nama: 'Eksperimen Mengapung & Tenggelam Perahu Plastisin di Air',
        area: 'Literasi & STEAM',
        alatBahan: 'Baskom air bening, adonan plastisin tahan air, koin mainan untuk muatan beban',
        langkah: 'Anak membentuk plastisin menjadi mangkuk perahu, mengapungkannya, lalu menambahkan koin satu per satu.',
        tujuan: 'Mengamati daya apung, perubahan bentuk, dan daya tampung beban perahu.',
        asesmen: 'Ceklis Nalar Kritis STEAM'
      }
    ],
    penutup: {
      refleksi: 'Recalling: menanyakan kendaraan apa yang pernah dinaiki anak bersama keluarga.',
      pesan: 'Pesan moral: Selalu memakai helm saat naik motor dan sabuk pengaman saat naik mobil.',
      besok: 'Info esok hari: Mengenal kendaraan udara roket luar angkasa dan membuat roket dari botol plastik.'
    }
  }
};

export async function generateAutoRpph(params: GenerateRpphParams): Promise<RpphItem> {
  const themeLower = params.tema.toLowerCase();
  let matchedKey = 'binatang';
  if (themeLower.includes('tanaman') || themeLower.includes('tumbuhan') || themeLower.includes('bunga') || themeLower.includes('buah')) {
    matchedKey = 'tanaman';
  } else if (themeLower.includes('kendaraan') || themeLower.includes('transportasi') || themeLower.includes('mobil') || themeLower.includes('jalan')) {
    matchedKey = 'kendaraan';
  } else if (themeLower.includes('binatang') || themeLower.includes('hewan') || themeLower.includes('kucing') || themeLower.includes('kelinci')) {
    matchedKey = 'binatang';
  }

  const preset = THEME_PRESETS[matchedKey] || THEME_PRESETS['binatang'];

  // Customize with params
  return {
    id: `rpph-gen-${Date.now()}`,
    kelompok: params.kelompok,
    semester: params.semester,
    mingguKe: params.mingguKe || 1,
    hari: params.hari || 'Senin',
    tanggal: params.tanggal || new Date().toISOString().split('T')[0],
    tema: params.tema,
    subTema: params.subTema,
    subSubTema: params.subSubTema || `Eksplorasi Menyenangkan ${params.subTema}`,
    tujuanPembelajaran: [
      `Anak bersyukur atas karunia Tuhan melalui topik ${params.subTema} (Nilai Agama)`,
      `Anak menunjukkan rasa bangga, mandiri, dan percaya diri saat beraktivitas (Jati Diri)`,
      `Anak mengeksplorasi konsep warna, bentuk, dan membilang berkaitan dengan ${params.subTema} (STEAM)`,
      `Anak terampil menggunakan koordinasi mata dan kedua tangan dalam berkarya (Motorik)`,
      `Anak aktif bertanya dan mengutarakan perasaannya dengan sopan (Bahasa)`
    ],
    kegiatanPembuka: {
      salamDanDoa: preset.pembuka.salam,
      sopPenyambutan: 'Pemeriksaan kebersihan tangan, menyapa hangat dengan senyum 5S, meletakkan botol minum di loker.',
      apersepsiDanLiterasi: `Berdialog hangat tentang pengalaman anak seputar topik "${params.subTema}". Guru menunjukkan buku gambar / media konkret terkait ${params.subSubTema || params.subTema}.`,
      gerakLaguFisik: preset.pembuka.gerak,
      waktu: '07.30 - 08.00 (30 Menit)'
    },
    kegiatanInti: preset.kegiatan.map((k, idx) => ({
      id: `act-gen-${Date.now()}-${idx}`,
      nama: `${k.nama} (Fokus: ${params.subTema})`,
      area: k.area,
      alatBahan: k.alatBahan,
      langkah: k.langkah,
      tujuanTerkait: k.tujuan,
      teknikAsesmen: k.asesmen
    })),
    istirahatMakan: {
      sopCuciTangan: 'Antre berbaris tertib di wastafel cuci tangan dengan sabun dan air mengalir, mengeringkan dengan serbet pribadi.',
      doaMakanDanBekal: 'Duduk melingkar di karpet, membaca doa sebelum dan sesudah makan, menikmati bekal bergizi seimbang tanpa berserakan.',
      mainBebasMotorik: 'Bermain bebas di halaman luar dengan pengawasan guru (ayunan, perosotan, jungkat-jungkit).',
      waktu: '09.30 - 10.15 (45 Menit)'
    },
    kegiatanPenutup: {
      recallingDanRefleksi: preset.penutup.refleksi,
      pesanKebaikanMoral: preset.penutup.pesan,
      doaPenutupDanSalam: 'Membaca doa sesudah belajar, doa naik kendaraan, doa kebaikan dunia akhirat, berpelukan/salam hangat.',
      infoKegiatanBesok: preset.penutup.besok,
      waktu: '10.15 - 10.30 (15 Menit)'
    },
    mediaSumberBelajar: [
      `Media konkret benda nyata bertema ${params.subTema}`,
      'Buku cerita bergambar anak PAUD Kurikulum Merdeka',
      'Lagu anak tematik ceria'
    ],
    teknikAsesmen: [
      'Ceklis Ketercapaian Tujuan Pembelajaran',
      'Catatan Anekdot Perilaku Anak',
      'Dokumentasi Foto Hasil Karya Siswa'
    ],
    catatanGuru: `RPPH otomatis di-generate berdasarkan Kurikulum Merdeka PAUD untuk kelompok ${params.kelompok}. Siap disesuaikan dengan kearifan lokal satuan.`
  };
}

export function generateRaportNarrativeFromAssessments(
  student: Student,
  semester: SemesterType,
  assessments: AssessmentRecord[],
  teacherName: string,
  principalName: string
): RaportNarrative {
  // Filter assessments for this student
  const studentRecords = assessments.filter(a => a.studentId === student.id);

  // Compute dominant ratings or fallback
  const getRatingSummary = (key: keyof AssessmentRecord['ratings']): AssessmentRating => {
    if (studentRecords.length === 0) return 'BSH';
    const counts: Record<AssessmentRating, number> = { BB: 0, MB: 0, BSH: 0, BSB: 0 };
    studentRecords.forEach(rec => {
      const r = rec.ratings[key];
      if (r) counts[r] = (counts[r] || 0) + 1;
    });
    if (counts.BSB >= counts.BSH && counts.BSB > 0) return 'BSB';
    if (counts.BSH >= counts.MB && counts.BSH > 0) return 'BSH';
    if (counts.MB > 0) return 'MB';
    return 'BSH';
  };

  const agamaRate = getRatingSummary('agamaBudiPekerti');
  const jatiDiriRate = getRatingSummary('jatiDiri');
  const steamRate = getRatingSummary('literasiSteam');
  const motorikRate = getRatingSummary('motorik');
  const sosioRate = getRatingSummary('sosialEmosional');
  const bahasaRate = getRatingSummary('bahasa');

  // Narrative generators
  const narasiAgama = agamaRate === 'BSB'
    ? `Alhamdulillah, Ananda ${student.namaPanggilan} menunjukkan perkembangan yang SANGAT BAIK (BSB) dalam elemen Nilai Agama dan Budi Pekerti. ${student.namaPanggilan} terbiasa berdoa dengan khusyuk sebelum dan sesudah kegiatan, mengucap salam dan bersalaman dengan santun, serta menunjukkan kasih sayang yang tulus kepada tanaman dan sesama ciptaan Allah SWT.`
    : `Alhamdulillah, Ananda ${student.namaPanggilan} BERKEMBANG SESUAI HARAPAN (BSH) pada elemen Nilai Agama dan Budi Pekerti. Ananda sudah mengenal bacaan doa harian, mampu mempraktikkan gerakan berwudhu/ibadah bersama teman, serta mulai terbiasa memaafkan dan mengucap terima kasih.`;

  const narasiJatiDiri = jatiDiriRate === 'BSB'
    ? `Pada elemen Jati Diri, Ananda ${student.namaPanggilan} BERKEMBANG SANGAT BAIK (BSB). ${student.namaPanggilan} memiliki kemandirian yang tinggi dalam merapikan barang pribadinya (sepatu, tas, botol minum), memiliki rasa percaya diri yang ceria saat tampil di depan kelas, serta menunjukkan kebiasaan hidup bersih dengan mencuci tangan memakai sabun secara tertib.`
    : `Pada elemen Jati Diri, Ananda ${student.namaPanggilan} BERKEMBANG SESUAI HARAPAN (BSH). Ananda telah mampu mengenali emosi dirinya (senang, sedih, lelah), berani mencoba tantangan baru di sentra main, serta mampu mengelola emosi dengan bantuan kalimat penenang dari guru.`;

  const narasiLiterasiSteam = steamRate === 'BSB'
    ? `Kemampuan Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM) Ananda ${student.namaPanggilan} BERKEMBANG SANGAT BAIK (BSB). ${student.namaPanggilan} sangat antusias mengamati hal-hal baru, mahir menyusun pola rancang bangun balok bertingkat yang simetris, mampu mengelompokkan benda berdasarkan ukuran dan warna, serta telah mengenali simbol huruf awal namanya secara tepat.`
    : `Kemampuan Dasar Literasi dan STEAM Ananda ${student.namaPanggilan} BERKEMBANG SESUAI HARAPAN (BSH). Ananda mampu membilang benda 1-10 dengan benda konkret, senang mendengarkan pembacaan buku cerita bergambar, serta aktif bereksplorasi dengan bahan loose parts alam (batu, daun, ranting) di sudut STEAM.`;

  const narasiMotorik = motorikRate === 'BSB'
    ? `Perkembangan Fisik Motorik Ananda ${student.namaPanggilan} BERKEMBANG SANGAT BAIK (BSB). Gerakan motorik kasarnya sangat lincah, berani meniti papan titian keseimbangan, dan terampil melompat serta melempar-menangkap bola. Pada motorik halus, koordinasi memegang gunting anak, meronce, dan membentuk plastisin dilakukan dengan presisi dan jemari yang kuat.`
    : `Perkembangan Fisik Motorik Ananda ${student.namaPanggilan} BERKEMBANG SESUAI HARAPAN (BSH). Ananda mampu melakukan gerakan senam irama dengan riang, melompat dengan dua kaki seimbang, serta semakin terbiasa menggunakan pensil/krayon dengan genggaman tiga jari (tripod grip) yang stabil.`;

  const narasiSosialEmosional = sosioRate === 'BSB'
    ? `Perkembangan Sosial Emosional Ananda ${student.namaPanggilan} BERKEMBANG SANGAT BAIK (BSB). ${student.namaPanggilan} memiliki empati yang tinggi, cepat menawarkan bantuan kepada teman yang membutuhkan, sabar menunggu giliran saat bermain bersama, serta mampu menyelesaikan perselisihan kecil dengan komunikasi yang damai.`
    : `Perkembangan Sosial Emosional Ananda ${student.namaPanggilan} BERKEMBANG SESUAI HARAPAN (BSH). Ananda dapat diajak bekerja sama dalam kelompok kecil, mau berbagi alat main bersama teman sebaya, serta menunjukkan rasa bangga atas hasil usaha karya kelompoknya.`;

  const narasiBahasa = bahasaRate === 'BSB'
    ? `Kemampuan Bahasa dan Komunikasi Ananda ${student.namaPanggilan} BERKEMBANG SANGAT BAIK (BSB). ${student.namaPanggilan} mampu mengungkapkan ide, cerita, dan perasaannya menggunakan kalimat majemuk yang runtut dan jelas. Ananda juga sangat ekspresif saat bermain peran dan mampu menjawab pertanyaan terbuka "mengapa" dan "bagaimana" dengan cerdas.`
    : `Kemampuan Bahasa Ananda ${student.namaPanggilan} BERKEMBANG SESUAI HARAPAN (BSH). Ananda mampu menyimak instruksi sederhana dengan baik, senang mengulang lagu anak-anak bersama guru, serta mulai berani menceritakan pengalaman liburannya di depan teman-teman sekelas.`;

  return {
    studentId: student.id,
    semester,
    tahunAjaran: '2026/2027',
    narasiAgamaBudiPekerti: narasiAgama,
    narasiJatiDiri,
    narasiLiterasiSteam,
    narasiMotorik,
    narasiSosialEmosional,
    narasiBahasa,
    proyekP5: {
      judul: semester === 'Ganjil' 
        ? 'Aku Sayang Bumi: Mengolah Sampah Organik & Menanam Sayuran'
        : 'Kita Semua Bersaudara: Mengenal Budaya Nusantara & Permainan Tradisional',
      deskripsi: `${student.namaPanggilan} berpartisipasi aktif dalam rangkaian proyek, tekun merawat tanaman bayam di pot daur ulang, serta senang bergotong royong membersihkan area taman bersama teman sekelas.`,
      capaian: 'Sangat Baik (Menunjukkan karakter Profil Pelajar Pancasila secara konsisten)'
    },
    pertumbuhanFisik: {
      tinggiBadan: student.kelompok === 'A' ? 105.5 : 112.0,
      beratBadan: student.kelompok === 'A' ? 17.2 : 20.4,
      lingkarKepala: student.kelompok === 'A' ? 50.0 : 51.5,
      kesehatanGigi: 'Gigi susu bersih, terawat, tidak ada karang gigi atau karies.',
      statusGizi: 'Status Gizi Baik & Sangat Baik (Sesuai Kurva Standar Kemenkes/WHO)'
    },
    kehadiran: {
      sakit: 1,
      izin: 0,
      tanpaKeterangan: 0
    },
    refleksiGuru: `Ananda ${student.namaPanggilan} adalah murid yang sangat ceria, penuh rasa ingin tahu, dan disenangi teman-temannya. Teruslah bertumbuh menjadi anak sholeh/sholehah yang berakhlak mulia dan membanggakan keluarga tercinta.`,
    saranOrangTua: `Diharapkan ayah dan bunda senantiasa mempertahankan rutinitas dialog hangat di rumah, membacakan buku cerita sebelum tidur, serta memberi apresiasi positif atas setiap usaha kecil yang dilakukan Ananda ${student.namaPanggilan}.`,
    tempatTanggalRapor: semester === 'Ganjil' ? 'Depok, 18 Desember 2026' : 'Depok, 19 Juni 2027',
    tandaTangan: {
      guruKelas: teacherName || 'Siti Nurhaliza, S.Pd',
      kepalaSekolah: principalName || 'Dra. Hj. Sri Wahyuni, M.Pd'
    }
  };
}
