
export const SCENE_KEYS = {
  v1: 'v1',
  v2: 'v2',
  v3: 'v3'
};

export const SCENES = {
  v1: {
    view: [
      "/images/cube-map/nx.png",
      "/images/cube-map/px.png",
      "/images/cube-map/py.png",
      "/images/cube-map/ny.png",
      "/images/cube-map/pz.png",
      "/images/cube-map/nz.png"],
    hotspot: [
      {
        key: 1,
        position: [-10, -50, -50],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v2
      },
      {
        key: 2,
        position: [60, -35, 90],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v3
      }
    ],
    areas: [
      {
        key: 'A1',
        position: [-300, -50, -235],
        text: 'Trung cấp Kỹ thuật & Nghiệp vụ </br> Công đoàn Bình Dương',
        lineHeight: 50,
        line: 2,
        distance: 65
      },
      {
        key: 'A2',
        position: [-260, -45, -323.6067977499789],
        text: 'THCS Trần Đại Nghĩa',
        lineHeight: 90,
        line: 1,
        distance: 70
      },
      {
        key: 'A3',
        position: [-235.1141009169893, -40, -323.6067977499789],
        text: 'Cao Đẳng Việt Nam – Singapore CS2',
        lineHeight: 120,
        line: 1,
        distance: 70
      },
      {
        key: 'A3',
        position: [-183, -22, -323.6067977499789],
        text: 'MM MEGA MARIET',
        lineHeight: 160,
        line: 1,
        distance: 65
      },
      {
        key: 'A4',
        position: [-45, -105, -380.4226065180614],
        text: 'Ga C7 Metro TDM',
        lineHeight: 160,
        line: 1,
        distance: 70
      },
      {
        key: 'A5',
        position: [30, -85, -400],
        text: 'BVQT Comlumbia Asia',
        lineHeight: 100,
        line: 1,
        distance: 70
      },
      {
        key: 'A6',
        position: [100, -150, -400],
        text: 'Cao Đẳng Việt Nam – Singapore',
        lineHeight: 200,
        line: 1,
        distance: 70
      },
      {
        key: 'A7',
        position: [180, -45, -380.42260651806146],
        text: 'Đại học Kinh tế - Kỹ thuật Bình Dương',
        lineHeight: 160,
        line: 1,
        distance: 75
      },
      {
        key: 'B1',
        position: [-220, -120, 123.60679774997901],
        text: 'TIỂU HỌC HƯNG LỘC',
        lineHeight: 140,
        line: 1,
        distance: 40
      },
      {
        key: 'B2',
        position: [-380.4226065180614,-40,123.60679774997901],
        text: 'THCS NGUYỄN TRUNG TRỰC',
        lineHeight: 120,
        line: 1,
        distance: 65
      },
      {
        key: 'B3',
        position: [-500,-105,110],
        text: 'TRƯỜNG MẦM NON HOA MAI',
        lineHeight: 120,
        line: 1,
        distance: 80
      },
      {
        key: 'B4',
        position: [-380,-50,-50],
        text: 'CHỢ BÚNG',
        lineHeight: 80,
        line: 1,
        distance: 60
      },
      {
        key: 'B5',
        position: [-380.4226065180614,-42,-123.6067977499791],
        text: 'TIỂU HỌC LƯƠNG THẾ VINH',
        lineHeight: 160,
        line: 1,
        distance: 65
      },
      {
        key: 'B6',
        position: [-320.4226065180614,-35,-123.6067977499791],
        text: 'THCS TRỊNH HOÀI ĐỨC',
        lineHeight: 80,
        line: 1,
        distance: 55
      },
      {
        key: 'C1',
        position: [278,0,323.60679774997897],
        text: 'VINCOM PLAZA',
        lineHeight: 80,
        line: 1,
        distance: 65
      },
      {
        key: 'C2',
        position: [240,-180,323.60679774997897],
        text: 'KCN VIỆT HƯƠNG',
        lineHeight: 200,
        line: 1,
        distance: 65
      },
      {
        key: 'C3',
        position: [200,-10,323.60679774997897],
        text: 'KCN ĐỒNG AN 1',
        lineHeight: 110,
        line: 1,
        distance: 60
      },
      {
        key: 'C4',
        position: [140,-35,380.4226065180614],
        text: 'AEON MALL',
        lineHeight: 60,
        line: 1,
        distance: 65
      },
      {
        key: 'C5',
        position: [123.60679774997898,-30,380.4226065180614],
        text: 'KCN VSIP 1',
        lineHeight: 100,
        line: 1,
        distance: 65
      },
      {
        key: 'C6',
        position: [95,0,380.4226065180614],
        text: 'TRUNG TÂM TP.HCM ',
        lineHeight: 160,
        line: 1,
        distance: 65
      },
      {
        key: 'C7',
        position: [60,0,380.4226065180614],
        text: 'BVQT BECAMEX',
        lineHeight: 100,
        line: 1,
        distance: 60
      },
      {
        key: 'C8',
        position: [60,0,380.4226065180614],
        text: 'LOTTE MART',
        lineHeight: 40,
        line: 1,
        distance: 60
      },
      {
        key: 'C9',
        position: [50,-10,380.4226065180614],
        text: 'THPT Nguyễn Trãi',
        lineHeight: 80,
        line: 1,
        distance: 60
      },
      {
        key: 'C10',
        position: [45,-12,380.4226065180614],
        text: 'Trường THCS Nguyễn Văn Tiết',
        lineHeight: 140,
        line: 1,
        distance: 60
      },
      {
        key: 'C11',
        position: [2.4492935982947064e-14,-10,400],
        text: 'SÂN GOLF SÔNG BÉ',
        lineHeight: 180,
        line: 1,
        distance: 65
      },
      {
        key: 'D1',
        position: [240,-42,-123.60679774997907],
        text: 'CHỢ THUẬN GIAO',
        lineHeight: 60,
        line: 1,
        distance: 40
      },
      {
        key: 'D2',
        position: [260,-40,-123.60679774997907],
        text: 'THPT TRẦN VĂN ƠN',
        lineHeight: 90,
        line: 1,
        distance: 40
      },
      {
        key: 'D3',
        position: [360,-20,10],
        text: 'KDC VIETSING ',
        lineHeight: 90,
        line: 1,
        distance: 50
      },
      {
        key: 'D4',
        position: [320,-15,30],
        text: 'CHỢ VIETSING',
        lineHeight: 100,
        line: 1,
        distance: 50
      }
    ]
  },
  v2: {
    view: [
      "/images/cube-map-1/nx.png",
      "/images/cube-map-1/px.png",
      "/images/cube-map-1/py.png",
      "/images/cube-map-1/ny.png",
      "/images/cube-map-1/pz.png",
      "/images/cube-map-1/nz.png"
    ],
    hotspot: [
      {
        key: 3,
        position: [-10, 10, 40],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v1
      },
      {
        key: 4,
        position: [25, 0, 80],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v3
      }
    ],
    areas: []
  },
  v3: {
    view: [
      "/images/cube-map-2/nx.png",
      "/images/cube-map-2/px.png",
      "/images/cube-map-2/py.png",
      "/images/cube-map-2/ny.png",
      "/images/cube-map-2/pz.png",
      "/images/cube-map-2/nz.png"],
    hotspot: [
      {
        key: 5,
        position: [0, 15, 90],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v1
      },
      {
        key: 6,
        position: [-20, 10, 100],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v2
      }
    ],
    areas: []
  }
};


export const SCENEMOBILES = {
  v1: {
    view: [
      "/images/cube-map/nx.png",
      "/images/cube-map/px.png",
      "/images/cube-map/py.png",
      "/images/cube-map/ny.png",
      "/images/cube-map/pz.png",
      "/images/cube-map/nz.png"],
    hotspot: [
      {
        key: 1,
        position: [-10, -50, -50],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v2
      },
      {
        key: 2,
        position: [60, 0, 90],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v3
      }
    ],
    areas: []
  },
  v2: {
    view: [
      "/images/cube-map-1/nx.png",
      "/images/cube-map-1/px.png",
      "/images/cube-map-1/py.png",
      "/images/cube-map-1/ny.png",
      "/images/cube-map-1/pz.png",
      "/images/cube-map-1/nz.png"],
    hotspot: [
      {
        key: 3,
        position: [-10, 10, 40],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v1
      },
      {
        key: 4,
        position: [25, 0, 80],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v3
      }
    ],
    areas: []
  },
  v3: {
    view: [
      "/images/cube-map-2/nx.png",
      "/images/cube-map-2/px.png",
      "/images/cube-map-2/py.png",
      "/images/cube-map-2/ny.png",
      "/images/cube-map-2/pz.png",
      "/images/cube-map-2/nz.png"],
    hotspot: [
      {
        key: 5,
        position: [0, 15, 90],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v1
      },
      {
        key: 6,
        position: [-20, 10, 100],
        title: '',
        imageUrl: "/images/360-image.png",
        key: SCENE_KEYS.v2
      }
    ],
    areas: []
  }
};
