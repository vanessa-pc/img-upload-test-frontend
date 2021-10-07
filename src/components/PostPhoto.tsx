import { useState } from 'react';
import axios from 'axios';

async function postImage({image, description}:{image: File; description: string}){
  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);
  const result = await axios.post('http://localhost:4000/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

function PostPhoto(): JSX.Element {

  const [images, setImages] = useState<File[]>([]);
  const [file, setFile] = useState<File>(images[0]);
  const [description, setDescription] = useState("");

  const submit = async (event: any) => {
    event.preventDefault();
    const result = await postImage({image: file, description});
    setImages([result.image, ...images])
  };

  const fileSelected = (event:any) => {
    const file = event.target.files[0];
    setFile(file)
  };

  return (
    <>
    <div className="submit-photo">

      <form onSubmit={submit}>
        <input type="file" accept="image/*" onChange={fileSelected} />
        <input type="text" value={description} onChange={ e => setDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {/* { images.map(image => (
        <div key={image}>
          <img src={image} alt="" />
        </div>
      ))} */}
    </div>

    <img src="http://localhost:4000/images/e259881726b2e63cadf515e0b6542627" alt="" />

    </>
    );
}



export default PostPhoto;
