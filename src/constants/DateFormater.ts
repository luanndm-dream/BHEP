const getElapsedTime = (timestamp: number | string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const difference = now.getTime() - time.getTime();
  
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  
    if (seconds < 60) return `${seconds} giây trước`;
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  };
  
  export default getElapsedTime;
  