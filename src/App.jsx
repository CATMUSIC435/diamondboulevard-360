  "use client";

  import { Mobile } from "./mobile";
  import { Desktop } from "./desktop";
import { useDeviceDetect } from "./hooks/use-device-detect";


  function App() {
    const { isMobile } = useDeviceDetect();
    
    return isMobile ?   <Mobile />    :  <Desktop />;
  }

  export default App;