## 🚀 Description

Added task creation using a floating + button

Cancel task if not needed while  creating

Toggle tasks between done and pending by tapping

Edit tasks via a modal triggered by long-press

Delete tasks via long-press option

Tasks are sorted with pending tasks first

Local persistence using AsyncStorage to save tasks across app restarts

Custom fonts applied for app title and task text

Edge cases handled:

Prevents adding empty tasks

Canceling task creation clears input and hides keyboard

Editing a task modal ensures empty edits are not saved

> Example:  
> - Implemented task creation form  
> - Added toggle functionality for task completion  
> - Enabled local persistence using AsyncStorage

---

## 💡 Solution Rationale & User Value

Please take a moment to explain:

- Why you structured the solution the way you did
All hooks (useState, useEffect) are declared at the top level to comply with React native rules.

- What you were optimizing for (e.g. performance, readability, UX)
Floating buttons provide quick add/cancel actions; modal for editing prevents accidental edits.

- How this benefits the end user
Intuitive task management workflow
Persistent tasks allow users to close and reopen the app without losing data
Smooth interaction for adding, editing, and deleting tasks

This helps us understand how you think and make decisions.

---

## 💾 Local Persistence Rationale

Used AsyncStorage for local persistence because it is lightweight, simple to integrate with React Native, and suitable for storing small to medium amounts of key-value data.

But Not suitable for very large datasets or complex queries; however, it is sufficient for a task list app.

---

## 🧠 Global State (if used)

If you used a global state management solution (e.g. Redux, Zustand), briefly explain:
Not used 
- Why it was used
- What value it added over local state

---

## 💫 Animations (Bonus, if implemented)

Added an animation with a splash screen and didnt added while creating the tasks and all because it might be a  little too much for an app that increases the productivity of a person

---

## 🎥 Demo Video

Google Drive Link: https://drive.google.com/drive/folders/1KP8JVDIlM0xudGtdpmY-Ox-tTXcgcUc0?usp=sharing

---

## 🛠️ Setup Instructions (if different from README)

Mention any additional setup steps or environment changes, if applicable.

---

## 📌 Known Limitations / Assumptions

List any known bugs, incomplete features, or assumptions made during implementation.

---

## ✅ Checklist

- [ ] Tasks can be added
- [ ] Tasks can be viewed
- [ ] Tasks can be edited
- [ ] Tasks can be marked complete/incomplete
- [ ] Tasks can be deleted
- [ ] Data is persisted locally on the device
- [ ] Local storage method explained
- [ ] (Optional) Global state usage explained
- [ ] (Optional) Animations added using `react-native-reanimated`
- [ ] Demo video included
- [ ] Solution rationale & user value explained

---
