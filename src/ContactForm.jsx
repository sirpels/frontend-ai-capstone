import { useState } from "react";

// ============================================
// STEP 1: This is our main component.
// Think of a "component" like a LEGO block —
// it's a reusable piece of UI (in this case, a form).
// ============================================
export default function ContactForm() {
  // ============================================
  // STEP 2: "State" is how React remembers things.
  // Every time the user types, we save it here.
  // Think of it like a notebook that updates live.
  // ============================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // This stores any error messages (e.g. "Email is required")
  const [errors, setErrors] = useState({});

  // This tells us if the form was submitted successfully
  const [submitted, setSubmitted] = useState(false);

  // ============================================
  // STEP 3: This function runs EVERY time the user
  // types in an input box. It updates our "notebook" (state).
  // ============================================
  function handleChange(e) {
    const { name, value } = e.target; // name = "email", value = what user typed
    setFormData((prev) => ({
      ...prev, // keep the other fields the same
      [name]: value, // update only the field that changed
    }));
  }

  // ============================================
  // STEP 4: Simple validation — checking if the
  // form is filled correctly before sending it.
  // Real-world example: like a bouncer checking ID
  // before letting someone into a club.
  // ============================================
  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // this checks the email has an "@" and a "." like a real email
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }

    return newErrors;
  }

  // ============================================
  // STEP 5: This runs when the user clicks "Send"
  // ============================================
  function handleSubmit(e) {
    e.preventDefault(); // stops the page from refreshing (default browser behavior)

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, show them and stop here
      setErrors(validationErrors);
      return;
    }

    // No errors — clear old errors and mark as submitted
    setErrors({});
    setSubmitted(true);

    // ============================================
    // In a REAL project, this is where you'd send
    // the data to a server, e.g:
    //
    // fetch("https://your-api.com/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    //
    // For now, we just log it so you can see it works.
    // ============================================
    console.log("Form submitted:", formData);

    // Reset the form after a short delay
    setFormData({ name: "", email: "", message: "" });
  }

  // ============================================
  // STEP 6: This is what shows on the screen (the UI)
  // ============================================
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Contact Us</h2>
        <p style={styles.subtitle}>
          Fill the form below and we'll get back to you.
        </p>

        {submitted && (
          <div style={styles.successBox}>
            ✅ Message sent successfully! We'll reply soon.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* NAME FIELD */}
          <div style={styles.field}>
            <label style={styles.label} htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Pelumi Adeyemi"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.name ? "#e53e3e" : "#ccc",
              }}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>

          {/* EMAIL FIELD */}
          <div style={styles.field}>
            <label style={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. pelumi@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.email ? "#e53e3e" : "#ccc",
              }}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>

          {/* MESSAGE FIELD */}
          <div style={styles.field}>
            <label style={styles.label} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.message ? "#e53e3e" : "#ccc",
                resize: "vertical",
              }}
            />
            {errors.message && <p style={styles.error}>{errors.message}</p>}
          </div>

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================
// STEP 7: Styling — kept simple and inline so you
// can see everything in ONE file while learning.
// (In a real project, you'd usually use a CSS file
// or Tailwind instead of inline styles like this.)
// ============================================
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "22px",
    color: "#1a1a1a",
  },
  subtitle: {
    margin: "0 0 20px 0",
    fontSize: "14px",
    color: "#666",
  },
  field: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    outline: "none",
  },
  error: {
    color: "#e53e3e",
    fontSize: "13px",
    margin: "4px 0 0 0",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2d6cdf",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  successBox: {
    backgroundColor: "#e6ffed",
    color: "#166534",
    padding: "10px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "16px",
  },
};