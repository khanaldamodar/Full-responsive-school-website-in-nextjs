'use client'
import { UploadCloud } from 'lucide-react'
import { usePost } from '@/services/usePost'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'



export default function AddNoticePage() {
  const searchParams = useSearchParams();
const router = useRouter();
const noticeId = searchParams.get('id');
const isEditMode = !!noticeId;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { post, loading, error } = usePost()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim()) {
    alert("Title is required");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  if (description) formData.append("description", description);
  if (image) formData.append("image", image);

  try {
    if (isEditMode) {
      // Use PUT override (since formData doesn't support PUT directly)
      formData.append("_method", "PUT");
      await axios.post(`http://127.0.0.1:8000/api/notices/${noticeId}`, formData);
    } else {
      await post("http://127.0.0.1:8000/api/notices", formData);
    }

    setSuccess(true);

    // Optional: clear form only if not edit
    if (!isEditMode) {
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    }

    // Redirect to notices list after short delay
    setTimeout(() => {
      router.push("/admin/notices");
    }, 1500);
  } catch (err) {
    console.error("Failed to submit:", err);
  }
};

  useEffect(() => {
  const fetchNotice = async () => {
    if (noticeId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notices/${noticeId}`);
        const { title, description } = response.data.data;
        setTitle(title);
        setDescription(description);
        // Note: You cannot preload image in file input due to browser restrictions
      } catch (err) {
        console.error("Failed to fetch notice:", err);
      }
    }
  };
  fetchNotice();
}, [noticeId]);


  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add New Notice</h1>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          ✅ Notice submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-3 max-h-40 rounded border" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold py-2 px-4 rounded shadow`}
        >
          {loading ? 'Submitting...' : (
            <>
              <UploadCloud className="inline mr-2 w-5 h-5" />
              Submit Notice
            </>
          )}
        </button>
      </form>
    </div>
  )
}
