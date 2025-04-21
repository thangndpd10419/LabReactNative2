import React, { createContext, useContext, useState } from "react";
const NotiContext = createContext(); // tạo vùng chứa dũ liệu chia sẻ

export const NotiProvider = ({ children }) => {
  // component bao quanh child
  const [notiCount, setNotiCount] = useState(0);

  const addNoti = () => setNotiCount((prev) => prev + 1);
  const resetNoti = () => setNotiCount(0);

  return (
    <NotiContext.Provider value={{ notiCount, addNoti, resetNoti }}>
      {children}
    </NotiContext.Provider>
  );
};
export default NotiContext;
