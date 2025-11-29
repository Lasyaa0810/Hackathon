import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import FormRow from "../components/FormRow";
import Button from "../components/Button";
import Toast from "../components/Toast";

export default function Student() {
  const { data, addResponse } = useData();
  const { user } = useAuth();

  const [courseId, setCourseId] = useState(data.courses[0]?.id || "");
  const [formId, setFormId] = useState("");
  const [answers, setAnswers] = useState({});
  const [studentName, setStudentName] = useState(user?.name || "");
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const forms = data.forms.filter((f) => f.courseId === courseId);
    setFormId(forms[0]?.id || "");
    setAnswers({});
  }, [courseId, data.forms]);

  useEffect(() => {
    if (user?.name) setStudentName(user.name);
  }, [user?.name]);

  const form = data.forms.find((f) => f.id === formId);

  function setAnswer(qid, value) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function canSubmit() {
    if (!form) return false;
    // require at least one rating answered for rating-only forms
    const ratingQs = form.questions.filter(q => q.type === "rating");
    if (ratingQs.length > 0) {
      return ratingQs.every(q => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "");
    }
    // if no rating questions, allow if there is any filled answer
    return form.questions.some(q => (answers[q.id] || "").toString().trim().length > 0);
  }

  function submit() {
    if (!formId) return setToast({ show: true, message: "Please select a form." });
    if (!canSubmit()) return setToast({ show: true, message: "Please answer all required questions." });

    const nameToSave = studentName?.trim() || user?.name || "Anonymous";

    const resp = {
      id: `r_${Date.now()}`,
      courseId,
      formId,
      studentName: nameToSave,
      answers,
      createdAt: new Date().toISOString(),
    };

    addResponse(resp);
    setToast({ show: true, message: "Thanks — feedback submitted!" });

    if (!user) setStudentName("");
    setAnswers({});
  }

  return (
    <div>
      <Card title="Submit Feedback">
        <FormRow label="Choose course">
          <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            {data.courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </FormRow>

        <FormRow label="Choose form">
          <select className="input" value={formId} onChange={(e) => setFormId(e.target.value)}>
            {data.forms.filter((f) => f.courseId === courseId).map((f) => (
              <option key={f.id} value={f.id}>{f.title}</option>
            ))}
            {data.forms.filter((f) => f.courseId === courseId).length === 0 && <option value="">No forms for this course</option>}
          </select>
        </FormRow>

        {form && (
          <>
            <FormRow label="Your name (optional)">
              <input className="input" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder={user ? "Using your account name" : "Enter your name (optional)"} />
            </FormRow>

            {form.questions.map((q) => (
              <FormRow key={q.id} label={q.text}>
                {q.type === "rating" ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setAnswer(q.id, n)}
                        className={`btn ${answers[q.id] === n ? "btn-primary" : "btn-ghost"}`}
                        aria-pressed={answers[q.id] === n}
                        style={{ minWidth: 44 }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea rows="3" className="input" value={answers[q.id] || ""} onChange={(e) => setAnswer(q.id, e.target.value)} />
                )}
              </FormRow>
            ))}

            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={submit} disabled={!canSubmit()}>Submit</Button>
              <Button variant="ghost" onClick={() => { setAnswers({}); if (!user) setStudentName(""); }}>Reset</Button>
            </div>
          </>
        )}
      </Card>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
