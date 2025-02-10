import { useEffect, useState } from "react";
import JobDetails from "./job_details";
import ColourDetails from "./colour_details";
import SunAttendPress from "./sap_date_time";
import SubmitSection from "./submit";
import aniloxOptions from "./aniloxOptions";
import styles from "./styles.module.css";

const ColourForm = () => {
  const [PPONum, setPPONum] = useState("");
  const [designNum, setDesignNum] = useState("");
  const [speNum, setSPENum] = useState("");
  const [counter, setCounter] = useState(1);
  const [colors, setColors] = useState(
    Array(counter).fill({
      selectedColor: null,
      selectedColorType: null,
      rgb: null,
      anilox: null,
      DE: "",
      target: null,
      wasColourOnPrevJob: false,
      date_time: null,
    })
  );

  const [date, setDate] = useState("");
  const [sunAttendPress, setSunAttendPress] = useState(null);
  const [pantoneOptions, setPantoneOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const fetchPantoneOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_PANTONES}?fullList=true`
        );
        const data = await response.json();
        setPantoneOptions(data);
      } catch (error) {
        console.error("Error fetching Pantone options:", error);
      }
    };
    fetchPantoneOptions();
  }, []);

  const handleInputChange = (setter, sliceValue) => (e) => {
    let value = e.target.value;
    const numPart = value.replace(/[^0-9]/g, "").slice(0, sliceValue);
    value = numPart;
    setter(value);
  };

  const handleChange = (index, field, value) => {
    setColors((prevColours) => {
      const newColours = [...prevColours];
      newColours[index] = { ...newColours[index], [field]: value };
      return newColours;
    });
  };

  const handleAddColour = () => {
    if (counter < 6) {
      setCounter((prevCount) => prevCount + 1);
      setColors((prevColours) => [
        ...prevColours,
        { selectedColor: null, rgb: null, anilox: null, DE: "", target: null },
      ]);
    }
  };

  const resetForm = () => {
    setPPONum(""); // Reset to empty string
    setDesignNum(""); // Reset to empty string
    setSPENum(""); // Reset to empty string
    setCounter(1); // Reset the counter
    setColors([
      {
        selectedColor: null,
        selectedColorType: null,
        rgb: null,
        anilox: null,
        DE: "",
        target: null,
        wasColourOnPrevJob: false,
      },
    ]); // Reset colors array to initial state
    setSunAttendPress(null); // Reset Sun Attend Press to null
    setError(null); // Clear any validation errors
    setDate(null);

    setFormKey((prevKey) => prevKey + 1);
  };

  const handleRemoveColour = (index) => {
    if (colors.length > 1) {
      setCounter((prevCount) => prevCount - 1);
      setColors((prevColors) => prevColors.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    if (!PPONum || !designNum || !speNum) {
      return "Please fill out all job code fields";
    }
    for (let i = 0; i < colors.length; i++) {
      const { selectedColor, selectedColorType, rgb, anilox, DE, target } =
        colors[i];
      if (
        !selectedColor ||
        !selectedColorType ||
        !rgb ||
        !anilox ||
        !DE ||
        !target
      ) {
        return `Please fill out all fields for Colour ${i + 1}`;
      }
    }
    if (sunAttendPress === null) {
      return "Please select if Sun Attend Press is required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError); // Set error if validation fails
      return;
    }

    setIsLoading(true); // Set loading to true
    const formData = {
      PPONum: `PPO2-${PPONum}`,
      designNum: `200-${designNum}`,
      speNum: `SPE-${speNum}`,
      colors,
      sunAttendPress,
      date,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_CMFORM}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        resetForm();
        setUpdateMessage("Form Submitted");
      } else {
        alert("Failed to submit data");
        setUpdateMessage("Failed to submit");
        setError("Failed to submit");
      }
    } catch (error) {
      setError("Error submitting data");
      console.error("Error:", error);
    } finally {
      resetForm();
      setIsLoading(false); // Set loading to false after submission
      setTimeout(() => {
        setUpdateMessage(null);
      }, 3000);
    }
  };

  const targetOptions = [
    { value: "Pantone", label: "Pantone" },
    { value: "Master", label: "Master" },
    { value: "LAB", label: "LAB" },
  ];

  const sunAttendOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  return (
    <form onSubmit={handleSubmit} key={formKey}>
      <JobDetails
        PPONum={PPONum}
        setPPONum={setPPONum}
        designNum={designNum}
        setDesignNum={setDesignNum}
        speNum={speNum}
        setSPENum={setSPENum}
        handleInputChange={handleInputChange}
      />
      <ColourDetails
        colors={colors}
        options={pantoneOptions}
        handleChange={handleChange}
        aniloxOptions={aniloxOptions}
        targetOptions={targetOptions}
        handleRemoveColour={handleRemoveColour}
      />
      <SunAttendPress
        sunAttendPress={sunAttendPress}
        setSunAttendPress={setSunAttendPress}
        sunAttendOptions={sunAttendOptions}
        handleDateChange={(e) => setDate(e.target.value)}
        date={date}
      />
      {error ? (
        <span className={styles.tempMessage}>{error}</span>
      ) : updateMessage ? (
        <span>{updateMessage}</span>
      ) : null}
      <SubmitSection
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleAddColour={handleAddColour}
        counter={counter}
      />
    </form>
  );
};

export default ColourForm;
