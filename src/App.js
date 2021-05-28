import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import logo from "./logo.svg";
import "./logo.css";

const App = () => {
  const [notes, setNotes] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : [
          {
            id: Date.now(),
            content: "<p>Welcome to Note App.</p>",
          },
        ]
  );
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const data = notes.filter((note) =>
      note.content.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(data);
  }, [notes, search, setFilteredNotes]);

  const createNote = () => {
    setNotes([...notes, { id: Date.now(), content: content }]);
    toggleNoteModal();
  };

  const editNote = (id) => {
    let note = notes.filter((note) => note.id === id);
    setModal(true);
    setId(note[0].id);
    setContent(note[0].content);
  };

  const updateNote = () => {
    let newTodos = notes.map((note) => {
      if (note.id !== id) {
        return note;
      }
      return { ...note, content: content };
    });
    setNotes(newTodos);
    toggleNoteModal();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleNoteModal = () => {
    setModal(!modal);
    setId("");
    setContent("");
  };

  return (
    <div className="w-full h-screen mx-auto p-6 overflow-hidden">
      <img src={logo} className="logo mx-auto" alt="logo" />
      <div className="flex flex-wrap justify-between mx-20">
        <div>
          <button
            onClick={() => toggleNoteModal()}
            className="mb-4 mx-auto rounded-full p-3 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Create New One
          </button>
        </div>
        <div className="flex relative mb-3 w-60">
          <span className="rounded-l-md h-12 w-12 inline-flex items-center pl-3 bg-white dark:bg-gray-700 text-gray-500 dark:text-white shadow-sm">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <input
            type="text"
            className="rounded-r-lg flex-1 h-12 w-30 outline-none py-1 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-100 shadow-sm text-base"
            placeholder="Search Note"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="relative flex flex-col items-center h-60 justify-around p-5 rounded-2xl m-5 w-auto"
          >
            <div className="absolute z-0 w-full h-full text-white transform scale-x-105 scale-y-95 bg-purple-300 rounded-xl -rotate-2"></div>
            <div className="absolute z-0 w-full h-full text-white transform scale-x-105 scale-y-95 bg-purple-400 rounded-xl rotate-2"></div>
            <div className="absolute z-0 w-full h-full transform scale-x-105 scale-y-95 bg-gray-100 rounded-xl"></div>
            <h3 className="flex justify-start items-start z-10 p-2 text-xl font-semibold text-purple-900">
              <div className="float-left">
                {new Date(note.id).toLocaleString()} &nbsp;
              </div>
              <svg
                onClick={() => editNote(note.id)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-500 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                onClick={() => deleteNote(note.id)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </h3>
            <div
              className="z-10 p-2 text-gray-500 overflow-auto"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>
          </div>
        ))}
        {modal && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative w-1/3 mx-auto my-6">
                <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                    <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                      {id ? "Edit Note" : "Create Note"}
                    </h3>
                    <div className="absolute mt-1 right-4 top-4">
                      <button
                        onClick={() => toggleNoteModal()}
                        className="bg-transparent border border-transparent"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-6 h-6 text-gray-700 dark:text-white"
                          viewBox="0 0 1792 1792"
                        >
                          <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="relative max-h-80 overflow-y-auto flex-auto p-4">
                    <div className="text-lg leading-relaxed text-gray-600">
                      <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(e, editor) => {
                          const data = editor.getData();
                          setContent(data);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                      onClick={() => (id === "" ? createNote() : updateNote())}
                      style={{ transition: "all .15s ease" }}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
