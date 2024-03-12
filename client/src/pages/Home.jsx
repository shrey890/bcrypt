import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
	const [notes, setNotes] = useState([]);
	const [newNoteText, setNewNoteText] = useState("");
	const [editTask, setEditTask] = useState({ id: null, text: "" });
	const fetchNotes = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/notes`);
			setNotes(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	const addNote = async () => {
		try {
			const response = await axios.post(`http://localhost:3000/notes`, {
				text: newNoteText,
			});
			setNotes((prevNotes) => [...prevNotes, response.data]);
			await fetchNotes();
			setNewNoteText("");
		} catch (error) {
			console.log("error adding notes", error);
		}
	};
	const handleEdit = (text) => {
		setEditTask({ id: text.id, text: text.text });
	};
	const saveEdit = async () => {
		try {
			await axios.put(`http://localhost:3000/notes/${editTask.id}`, {
				text: editTask.text,
			});
			setEditTask({ id: null, text: "" });
			await fetchNotes();
		} catch (error) {
			console.error(error);
		}
	};
	const deleteNote = async (id) => {
		try {
			const conf = window.confirm("Are you sure you want to delete this note?");
			if (conf) {
				await axios.delete(`http://localhost:3000/notes/${id}`);
				await fetchNotes();
			}
			fetchNotes();
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchNotes();
	}, []);
	const downloadList = () => {
		const content = notes.map((note) => note.text).join("\n");
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "notes.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	return (
		<div>
			<div className="flex items-center justify-center pt-3 gap-2">
				<input
					type="text"
					placeholder="Add Notes..."
					value={newNoteText}
					onChange={(e) => setNewNoteText(e.target.value)}
					className="input input-bordered input-lg w-full max-w-xs"
				/>
				<button
					onClick={addNote}
					className="btn btn-active btn-neutral"
				>
					Add Note
				</button>
				<button onClick={downloadList} className="btn btn-active btn-accent">
					Download List
				</button>
			</div>
			<div>
				<h3 className="text-center mt-2">No. of notes: {notes.length}</h3>
				{notes.length > 0 ? (
					notes.map((note) => (
						<div key={note.id} className="p-5">
							{editTask.id === note.id ? (
								<>
									<input
										type="text"
										value={editTask.text}
										onChange={(e) =>
											setEditTask({ ...editTask, text: e.target.value })
										}
									/>
									<button onClick={saveEdit}>Save</button>
								</>
							) : (
								<div className="items-center flex justify-around">
									<p>{note.text}</p>
									<div className="flex justify-end">
										<button
											onClick={() => handleEdit(note)}
											className="btn btn-ghost"
										>
											Edit
										</button>
										<button
											onClick={() => deleteNote(note.id)}
											className="btn-ghost btn "
										>
											Delete
										</button>
									</div>
								</div>
							)}
						</div>
					))
				) : (
					<h1>No notes found</h1>
				)}
			</div>
		</div>
	);
};
export default Home;
