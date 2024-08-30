import React from "react";
export default function Loading(props) {
  React.useEffect(() => {
    const loadingElement = document.querySelector(".loading");
    function loadingTasks(e) {
      if (e.propertyName === "opacity") {
        props.setGameVariables();
      }
    }
    loadingElement.addEventListener("transitionend", (e) => loadingTasks(e));
    return () => {
      removeEventListener("transitionend", loadingTasks);
    };
  }, []);
  return (
    <div className={`loading ${props.loadFinish ? "fade" : ""}`}>
      <div className="loading__circle"></div>
    </div>
  );
}
