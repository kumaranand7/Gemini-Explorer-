import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useContext, useRef, useEffect, useState } from "react";

const Main = () => {
  const {
    input = input,
    setInput,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
  } = useContext(Context);

  const handleCardClick = (prompt) => {
    setInput(prompt);
  };

  const inputRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const [isListening, setIsListening] = useState(false);

  const toggleDictaphone = () => {
    if (recognition) {
      setIsListening(!isListening);
      handleSpeechRecognition(isListening);
    } else {
      console.log("Speech Recognition is not supported in this browser.");
    }
  };

  const handleSpeechRecognition = (listening) => {
    if (listening) {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(input + transcript);
      };
    } else {
      recognition.stop();
      recognition.onresult = () => {};
    }
  };

  recognition.onerror = (event) => {
    console.log("Speech recognition error: ", event.error);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        onSent();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [onSent]);

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="UserIcon" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Anand</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Explore the latest advancements in artificial intelligence and robotics"
                    )
                  }
                >
                  <p>
                    Explore the latest advancements in artificial intelligence
                    and robotics
                  </p>
                  <img src={assets.compass_icon} alt="CompassIcon" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Discover groundbreaking research in biotechnology and healthcare"
                    )
                  }
                >
                  <p>
                    Discover groundbreaking research in biotechnology and
                    healthcare
                  </p>
                  <img src={assets.bulb_icon} alt="CompassIcon" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Learn about cutting-edge medical treatments and breakthroughs"
                    )
                  }
                >
                  <p>
                    Learn about cutting-edge medical treatments and
                    breakthroughs
                  </p>
                  <img src={assets.message_icon} alt="CompassIcon" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Explore the world of coding and software development"
                    )
                  }
                >
                  <p>Explore the world of coding and software development</p>
                  <img src={assets.code_icon} alt="CompassIcon" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="UserIcon" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="GeminiIcon" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <input
                ref={inputRef}
                onChange={(event) => setInput(event.target.value)}
                value={input}
                type="text"
                placeholder="Enter a prompt here"
              />
              <div className="search-box-icon">
                <img src={assets.gallery_icon} alt="GalleryIcon" />
                <img
                  src={assets.mic_icon}
                  alt="MicIcon"
                  onClick={toggleDictaphone } style={{ cursor: "pointer" }}
                  />
                  {input ? (
                    <img
                      onClick={() => onSent()}
                      src={assets.send_icon}
                      alt="SendIcon"
                    />
                  ) : null}
                </div>
              </div>
              <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so
                double-check its responses.{" "}
                <a href="https://support.google.com/gemini/answer/13594961?visit_id=638488069169109558-2959892032&p=privacy_notice&rd=1#privacy_notice">
                  Your privacy & Gemini Apps
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Main;