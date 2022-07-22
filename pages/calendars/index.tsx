import { useEffect, useState } from "react";

import cx from "classnames";
import type { NextPage } from "next";

import { IconLeft, IconRight } from "../../components/Icons";
import commonStyles from "../../styles/Home.module.css";

import styles from "./calendar.module.scss";
import DefaultLayout from "../../components/layouts/DefaultLayout";

const HomeDisplaySetting: NextPage = () => {
  // const leftRef = useRef<HTMLDivElement>(null);
  // const rightRef = useRef<HTMLDivElement>(null);

  // const handleRightClick = () => {
  //   if (rightRef?.current) {
  //     rightRef.current.style.backgroundColor === "yellow"
  //       ? (rightRef.current.style.backgroundColor = "blue")
  //       : (rightRef.current.style.backgroundColor = "yellow");
  //   }
  // };

  // const myFunction = (e: MouseEventInit) => {
  //   if (leftRef.current && e.clientY && e.clientX) {
  //     leftRef.current.style.display = "block";
  //     leftRef.current.style.top = e.clientY - 128 + "px";
  //     leftRef.current.style.left = e.clientX - 10 + "px";
  //   }
  // };

  // const leaveFunction = () => {
  //   if (leftRef.current) {
  //     leftRef.current.style.display = "none";
  //   }
  // };

  // useEffect(() => {
  //   setDateEle(document?.querySelector(".date-container"));
  // }, []);

  // const [dateEle, setDateEle] = useState<any>();

  // function renderDate() {
  //   let daysInMonth = getDaysInMonth();
  //   let startDay = getStartDayInMonth();
  //   var lastDay = new Date(currentYear, currentMonth + 1, 0).getDay();
  //   let days = [];
  //   let daysInMonthBefore = new Date(currentYear, currentMonth, 0).getDate();

  //   if (dateEle) {
  //     dateEle.innerHTML = "";

  //     for (let i = 0; i < daysInMonth; i++) {
  //       days.push(i + 1);
  //     }

  //     if (startDay === 0) {
  //       for (let i = 0; i < 6; i++) {
  //         days.unshift(daysInMonthBefore - i);
  //       }
  //     }

  //     if (lastDay < 7) {
  //       for (let i = 1; i < 7 - lastDay + 1; i++) {
  //         days.push(i);
  //       }
  //     }

  //     for (let i = 1; i < 6; i++) {
  //       if (i < startDay) days.unshift(daysInMonthBefore - i + 1);
  //     }

  //     days.map(item => {
  //       dateEle.innerHTML += `
  //             <div className={day} style="width: 140px; text-align: center">${item}</div>
  //         `;
  //     });
  //   }
  // }

  // renderDate();

  const [currentMonthName, setCurrentMonthName] = useState("");
  const [currentYearName, setCurrentYearName] = useState(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [chooseDay, setChooseDay] = useState<any[]>([]);
  const [selectDay, setSelectDay] = useState<any[]>([]);
  const [eventDays, setEventDays] = useState<any[]>([]);
  let currentYear = new Date().getFullYear();
  const [page, setPage] = useState<any>(currentMonth + 1);

  useEffect(() => {
    setCurrentMonthName(
      new Date(currentYear, currentMonth).toLocaleString("en-us", {
        month: "long",
      })
    );
    // setChooseDay([]);
    // setSelectDay([]);
  }, [page]);

  const renderHeader = () => {
    const days = ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"];
    return days.map((item, i) => (
      <div key={i} className={styles.headerColItem}>
        <p className={styles.headerColTitle}>{item}</p>
      </div>
    ));
  };

  function getDaysInMonth() {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }

  function getStartDayInMonth() {
    return new Date(currentYear, currentMonth, 1).getDay();
  }

  const renderBody = () => {
    let daysInMonth = getDaysInMonth();
    let startDay = getStartDayInMonth();
    var lastDay = new Date(currentYear, currentMonth + 1, 0).getDay();
    let days = [];
    let daysInMonthBefore = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      days.push({ date: i + 1, month: currentMonth + 1 });
    }

    if (startDay === 0) {
      for (let i = 0; i < 6; i++) {
        days.unshift({ date: daysInMonthBefore - i });
      }
    }

    for (let i = 1; i < 6; i++) {
      if (i < startDay) days.unshift({ date: daysInMonthBefore - i + 1 });
    }

    if (lastDay < 7 && lastDay !== 0) {
      for (let i = 1; i < 7 - lastDay + 1; i++) {
        days.push({ date: i });
      }
    }

    const handleSelect = (item: any) => {
      if (chooseDay.length < 2) {
        setChooseDay([...chooseDay, item]);
      }
      if (chooseDay.length === 1) {
        let array = [chooseDay[0]];
        if (item.month > chooseDay[0].month) {
          for (let i = chooseDay[0].date + 1; i <= daysInMonthBefore; i++) {
            array.push({ date: i, month: currentMonth });
          }
          for (let i = 1; i <= item.date; i++) {
            array.push({ date: i, month: currentMonth + 1 });
          }
        } else {
          for (let i = chooseDay[0].date; i <= item.date; i++) {
            array.push({ date: i, month: currentMonth + 1 });
          }
        }
        setChooseDay(array);
      }
    };

    const handleMove = (item: any) => {
      if (chooseDay.length === 1) {
        let array = [];
        if (item.month > chooseDay[0].month) {
          for (let i = chooseDay[0].date + 1; i <= daysInMonthBefore; i++) {
            array.push({ date: i, month: currentMonth });
          }
          for (let i = 1; i <= item.date; i++) {
            array.push({ date: i, month: currentMonth + 1 });
          }
        } else {
          for (let i = chooseDay[0].date; i <= item.date; i++) {
            array.push({ date: i, month: currentMonth + 1 });
          }
        }
        setSelectDay(array);
      }
    };

    const checkDayEvent = (item: any) => {
      let check = false;
      eventDays.map((arr) => {
        arr.map((i: { date: any; month: any }) => {
          if (i.date === item.date && i.month === item.month) {
            check = true;
          }
        });
      });
      return check;
    };

    const checkChooseDay = (item: any) => {
      let check = false;
      chooseDay.map((i) => {
        if (item.date === i.date && item.month === i.month) {
          check = true;
        }
      });
      return check;
    };

    const checkSelectDay = (item: any) => {
      let check = false;
      selectDay.map((i) => {
        if (item.date === i.date && item.month === i.month) {
          check = true;
        }
      });
      return check;
    };

    return days.map((item, i) =>
      item.month !== currentMonth + 1 ? (
        <div key={i} className={cx(styles.day, styles.dayDisable)}>
          {item.date}
        </div>
      ) : (
        <div
          key={i}
          className={cx(styles.day, {
            [styles.isHighlight]: checkChooseDay(item),
            [styles.isHover]: checkSelectDay(item),
            [styles.isEvent]: checkDayEvent(item),
          })}
          onMouseDown={() => handleSelect(item)}
          onMouseMove={() => handleMove(item)}
        >
          <p>{item.date}</p>
        </div>
      )
    );
  };

  const handlePre = (number: any) => {
    if (currentMonthName === "January") {
      setCurrentYearName(currentYearName - 1);
    }
    setPage(number);
    setCurrentMonth(number);
  };

  const handleNext = (number: any) => {
    if ((currentMonth + 1) % 12 === 0) {
      setCurrentYearName(currentYearName + 1);
    }
    setPage(number);
    setCurrentMonth(number);
  };

  const handleClear = () => {
    setChooseDay([]);
    setSelectDay([]);
  };

  const handleSubmit = () => {
    setEventDays([...eventDays, chooseDay]);
    setChooseDay([]);
    setSelectDay([]);
  };

  return (
    <DefaultLayout>
      <div className={commonStyles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {currentMonthName} - {currentYearName}
          </h1>
          <div className={styles.wrapperChooseDay}>
            <h3>Choose day:</h3>
            {/* <span className={styles.chooseDay}>
              From <span>
                {chooseDay[0].date - chooseDay[0].month}
                </span> to{" "}
              <span>{chooseDay[chooseDay.length - 1].date - chooseDay[chooseDay.length - 1].date }</span>
            </span> */}
            {chooseDay.length !== 0 || eventDays.length !== 0 ? (
              <div className={commonStyles.dFlex}>
                <button onClick={handleClear}>Clear</button>
                <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
                  Submit
                </button>
              </div>
            ) : (
              "no"
            )}
          </div>
        </div>
        <div className={styles.wrapperContent}>
          <button
            className={styles.btnChangeMonth}
            onClick={() => handlePre(page - 1)}
          >
            <IconLeft />
          </button>
          <div className={styles.wrapperCalendar}>
            <div className={styles.wrapperHeader}>
              <div className={commonStyles.dFlex}>{renderHeader()}</div>
            </div>
            <div className={styles.body}>{renderBody()}</div>
          </div>
          <button
            className={styles.btnChangeMonth}
            onClick={() => handleNext(page + 1)}
          >
            <IconRight />
          </button>
        </div>
        {/* <div className={styles.wrapperCalendar}>
          <div className={styles.wrapperHeader}>
            <div className={commonStyles.dFlex}>{renderHeader()}</div>
          </div>
          <div className={styles.body}>{renderBody()}</div>
        </div>
        <div className={styles.wrapperPagination}>
          <button className={styles.item} onClick={() => handlePre(page - 1)}>
            <IconLeft />
          </button>
          <button className={styles.item} onClick={() => handleNext(page + 1)}>
            <IconRight />
          </button>
        </div> */}
        {/* <div className={styles.contentWrap}>
          <div
            className={styles.left}
            onMouseMove={myFunction}
            onMouseLeave={leaveFunction}
          >
            Move the cursor over me
            <span ref={leftRef} className={styles.text}>
              Here
            </span>
          </div>
          <div
            className={styles.right}
            ref={rightRef}
            onClick={handleRightClick}
          >
            RIGHT
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default HomeDisplaySetting;
