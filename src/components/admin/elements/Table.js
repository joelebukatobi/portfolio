export default function Table({ caption, tags }) {
  return (
    <>
      <div className="flex items-center">
        <h3 className="text-black/90 mr-[1.6rem]">{caption}</h3>
        <div className="tag">
          <p>{tags}</p>
        </div>
      </div>
      <div className="mt-[2.4rem] border-[.1rem] border-black/10 rounded-[.8rem]">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Title</th>
              <th>Category</th>
              <th>Published Date</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
              <td>1961</td>
              <td>Malcolm Lockyer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>The Eagles</td>
              <td>1972</td>
              <td>1961</td>
              <td>Malcolm Lockyer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
              <td>1961</td>
              <td>Malcolm Lockyer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
