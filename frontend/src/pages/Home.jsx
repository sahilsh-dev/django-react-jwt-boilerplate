import { useState, useEffect } from "react";
import api from "../api";

function Home() {
	const [notes, setNotes] = useState([]);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = async () => {
		await api
			.get("/api/notes/")
			.then((res) => res.data)
			.then((data) => {
				setNotes(data);
				console.log(data);
			})
			.catch((err) => console.log(err));
	};

	const deleteNote = async (id) => {
		await api
			.delete(`/api/notes/${id}/`)
			.then(() => getNotes())
			.catch((err) => console.log(err));
	};

	const addNote = async (e) => {
		e.preventDefault();
		await api
			.post("/api/notes/", { title, content })
			.then(() => getNotes())
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<div>
				<h2>Notes</h2>
			</div>
			<h2>Create a Note</h2>
			<form onSubmit={addNote}>
				<label htmlFor="title">Title</label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<br />
				<label htmlFor="content">Content</label>
				<br />
				<textarea
					id="content"
					name="content"
					required
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				></textarea>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default Home;
