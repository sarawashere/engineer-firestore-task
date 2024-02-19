import React, { useState, useEffect } from 'react'; // Or Whatever React imports you want
import './App.css';


function App() {

  const [newChapterName, setNewChapterName] = useState('');
  const [chapterToDelete, setChapterToDelete] = useState('');

  const displayDatabase = async () => {
    try {
      const chap = collection(db, 'chapters');
      const doc_info = await getDocs(chap);

      doc_info.forEach((doc) => {
        console.log("Chapter location:", doc.location);
        console.log("Chapter name:", doc.name);
        console.log("Chapter name:", doc.membercount);

      });
    } catch (error) {
      console.error('error', error);
    }
  };

  // Function to add a chapter
  const addChapter = async () => {
    try {
      const chap = firestore.collection('chapters');
      await chap.add({
        name: chapName,
        location: chapLoc,
        membercount: chapCount
      });
      console.log('added');
      setchapName('');
      setchapLoc('');
      setchapCount('');
    } catch (error) {
      console.error('error', error);
    }
  };

  // Function to delete a chapter
  const deleteChapter = async () => {
    try {
      const chap = firestore.collection('chapters').doc(chapterToDelete);
      await chap.delete();
      console.log('deleted');
      setChapterToDelete('');
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="App">
      <h1>Chapter Operations</h1>
      <button onClick={displayDatabase}>Display Database</button>
      <div>
        <input
          type="text"
          placeholder="New Chapter Name"
          value={newChapterName}
          onChange={(e) => setNewChapterName(e.target.value)}
        />
        <button onClick={addChapter}>Add Chapter</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Chapter ID to Delete"
          value={chapterToDelete}
          onChange={(e) => setChapterToDelete(e.target.value)}
        />
        <button onClick={deleteChapter}>Delete Chapter</button>
      </div>
    </div>
  );
}

export default App;
