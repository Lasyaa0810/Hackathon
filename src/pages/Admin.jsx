import React, { useState } from "react";
import Card from "../components/Card";
import FormRow from "../components/FormRow";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";

export default function Admin() {
  const { data, addCourse, addForm } = useData();
  const [courseName, setCourseName] = useState("");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(data.courses[0]?.id || "");
  const [questions, setQuestions] = useState([{ id: `q_${Date.now()}`, text: 'Clarity of lectures (1-5)', type: 'rating' }]);

  function handleAddCourse() {
    if (!courseName.trim()) return alert('Course name required');
    addCourse({ id: `c_${Date.now()}`, name: courseName.trim() });
    setCourseName('');
  }

  function addQuestion() {
    setQuestions(prev => [...prev, { id: `q_${Date.now()}`, text: 'New question', type: 'text' }]);
  }

  function updateQuestion(i, key, val) {
    setQuestions(prev => prev.map((q, idx) => idx === i ? { ...q, [key]: val } : q));
  }

  function removeQuestion(i) {
    setQuestions(prev => prev.filter((_, idx) => idx !== i));
  }

  function handleCreateForm() {
    if (!formTitle.trim()) return alert('Form title required');
    if (!selectedCourse) return alert('Select a course');
    addForm({
      id: `f_${Date.now()}`,
      title: formTitle.trim(),
      courseId: selectedCourse,
      questions
    });
    setFormTitle('');
    setQuestions([{ id: `q_${Date.now()}`, text: 'Clarity of lectures (1-5)', type: 'rating' }]);
    setBuilderOpen(false);
  }

  return (
    <div>
      <Card title="Admin - Manage">
        <FormRow label="Create course">
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="Course name" />
            <Button onClick={handleAddCourse}>Add</Button>
          </div>
        </FormRow>

        <hr style={{ margin: '12px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Forms</div>
            <div className="small">{data.forms.length} forms</div>
          </div>
          <div>
            <Button onClick={() => setBuilderOpen(true)}>Create new form</Button>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          {data.forms.map(f => (
            <div key={f.id} style={{ padding: 12, border: '1px solid #f0f4ff', borderRadius: 8, marginBottom: 8 }}>
              <div style={{ fontWeight: 700 }}>{f.title}</div>
              <div className="small">{data.courses.find(c => c.id === f.courseId)?.name || 'Course removed'}</div>
              <div style={{ marginTop: 6 }} className="small">{f.questions.length} questions</div>
            </div>
          ))}
        </div>
      </Card>

      <Modal open={builderOpen} title="Create Feedback Form" onClose={() => setBuilderOpen(false)}>
        <FormRow label="Form title">
          <input className="input" value={formTitle} onChange={e => setFormTitle(e.target.value)} />
        </FormRow>

        <FormRow label="Assign to course">
          <select className="input" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
            <option value="">-- choose course --</option>
            {data.courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </FormRow>

        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>Questions</div>
            <Button onClick={addQuestion}>Add question</Button>
          </div>
          {questions.map((q, i) => (
            <div key={q.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input value={q.text} onChange={e => updateQuestion(i, 'text', e.target.value)} className="input" />
              <select value={q.type} onChange={e => updateQuestion(i, 'type', e.target.value)} className="input" style={{ width: 160 }}>
                <option value="text">Text</option>
                <option value="rating">Rating</option>
              </select>
              <button className="btn" onClick={() => removeQuestion(i)}>Remove</button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Button onClick={handleCreateForm}>Create</Button>
          <Button variant="ghost" onClick={() => setBuilderOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
