
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
      position: [60, 0, 90],
      title: '',
      imageUrl: "/images/360-image.png",
      key: SCENE_KEYS.v3
    }
  ],
  areas: [
    {
      key: 'A1',
      position: []
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
  ]
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
    },
    //  {
    //   position: [-10, -50, -50],
    //   title: '',
    //   imageUrl: "/images/360-image.png",
    //   key: SCENE_KEYS.EDGE
    // }
  ]
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
  ]
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
  ]
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
  ]
  }
};
