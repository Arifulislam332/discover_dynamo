import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import { motion } from "framer-motion";

const BlogCard = ({ blog, catid, index }) => {
  const [state, dispatch] = useContext(BlogContext);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);

  useEffect(() => {
    const isExist = state.blogs.some((bl) => bl.id === blog.id);

    if (isExist) {
      setHasBeenSaved(true);
    } else {
      setHasBeenSaved(false);
    }
  }, [state]);

  return (
    <motion.div
      initial={{ y: "10%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: index * 0.25 }}
      className="w-full p-5 rounded-2xl bg-gray-50 flex flex-col gap-5 shadow-md"
    >
      <Link
        to={`/categories${catid}/${blog.id}`}
        className="w-full aspect-[5/4] overflow-hidden rounded-xl"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-covern hover:scale-125 transition duration-500 ease-in-out"
        />
      </Link>
      <div className="flex flex-col gap-2.5">
        <h5 className="text-2xl font-medium">{blog.title.substring(0,20)}...</h5>
        <p className="text-gray-600">{blog.description.substring(0, 60)}...</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <Link to={`/categories${catid}/${blog.id}`} className="btn">
          Read More
        </Link>
        {!hasBeenSaved && (
          <button
            onClick={() =>
              dispatch({ type: "SAVE", payload: { ...blog, catid } })
            }
            className="btn__secondary"
          >
            Save Thread
          </button>
        )}

        {hasBeenSaved && (
          <button
            onClick={() =>
              dispatch({ type: "REMOVE", payload: { ...blog, catid } })
            }
            className="btn__secondary"
          >
            Remove Thread
          </button>
        )}
      </div>
    </motion.div>
  );
};
export default BlogCard;
