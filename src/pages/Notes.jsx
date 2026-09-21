import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [title1, setTitle1] = useState("");
  const [description1, setDescription1] = useState("");
  const [edit, setEdit] = useState(false);
  const[udateId,setUpdateId]= useState();
  const [sucess,setSucess]=useState("");
  const getNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes/getNotes");

      console.log("notes", res.data);

      setNotes(res.data);

    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const createNote = async () => {
    try {
      const res = await axiosInstance.post("/notes/createNotes", {
        Title: title1,
        description: description1,
      });

      console.log(res.data);

      setTitle1("");
      setDescription1("");

      if(res.status===201){
       
            setSucess("Note created sucessfully");
            setTimeout(()=>{
              setSucess("");
            },2000)
        
       
      }

      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      const res = await axiosInstance.delete(`/notes/deleteNotes/${id}`);

      console.log(res.data);

      getNotes();
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message);
    }
  };
   const updateNote = async(id)=>{
    try{
      const res = await axiosInstance.put(`/notes/updateNotes/${id}`, {
        Title: title,
        description: description,
      });
      console.log(res.data);
      getNotes();
    } catch (error) {
      console.log(error);
    }
   }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      <video
        src="/images/spidey.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed bottom-0 left-[50%] h-full w-[50%] object-contain  object-bottom-right"
      />

      <div className="relative z-1 min-h-screen bg-black/50 px-6 py-10">
        <h1 className="mb-8 text-center text-4xl font-bold">My Notes</h1>

        <div className="mx-auto max-w-5xl">
          
          <div className="mx-auto relative  mb-10 w-200 rounded-2xl border border-red-500/40 bg-black/60 p-6 backdrop-blur-xl">
          <div className="bg-red-600 left-0 top-0 bottom-0 absolute z-[-1] w-full  h-full ">
             <video src="/images/spidey1.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover ]" />
             </div>
            <input
              type="text"
              placeholder="Title"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
              className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/60 p-3 text-white outline-none"
            />

            <textarea
              placeholder="Description"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              className="mb-4 h-32 w-full rounded-xl border border-red-500/40 bg-black/60 p-3 text-white outline-none"
            />

            <div className="text-white">
              {sucess}
            </div>

            <button
              onClick={createNote}
              className="w-full rounded-xl bg-red-600 py-3 font-bold hover:bg-red-700"
            >
              Create Note
            </button>
          </div>

          {notes.map((note) => (
            
            <div
              key={note._id}
              className="mb-5 flex  relative rounded-2xl  border border-red-500/30 bg-black/50  backdrop-blur-xl"
            >
             <div className="bg-red-600 absolute z-0 right-0 h-full">
             <video src="/images/spidey.mp4" autoPlay loop muted playsInline className="h-full  object-bottom-right  w-full object-cover" />
             </div>
             <div className="p-6 z-1">
              <h2 className="mb-2 text-2xl font-bold ">{note.Title}</h2>

              <p className="text-gray-300">{note.description}</p>
              <div className="flex gap-4 ">
                <button onClick={() => deleteNote(note._id)} className="mt-4 h-10 rounded-xl bg-red-600 py-2 font-bold hover:bg-red-700 p-3">
                  Delete Note
                </button>

                <button onClick={() => setEdit(note._id)} className="mt-4 h-10 rounded-xl bg-red-600 py-2 font-bold hover:bg-red-700 p-3">
                  Edit Note
                </button>
                {edit===note._id && (
                  <div>
                    <button onClick={() => setEdit(false)} className="mb-4 w-15 rounded-xl border border-red-500/40 bg-black/60 p-3 text-white outline-none relative ">close</button>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/60 p-3 text-white outline-none" />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 h-32 w-full rounded-xl border border-red-500/40 bg-black/60 p-3 text-white outline-none" />
                    <button onClick={() =>updateNote(note._id)&&setEdit(false)} className="w-full rounded-xl bg-red-600 py-3 font-bold hover:bg-red-700">
                      Update Note
                    </button>
                  </div>
                )}
                
              </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}