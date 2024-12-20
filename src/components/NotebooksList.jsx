import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import ReactModal from "react-modal";
import "./NotebooksList.css";

// Setup Modal for Create Notebook
ReactModal.setAppElement("#root");

function NotebooksList() {
  const [notebooks, setNotebooks] = useState([]);
  const [filteredNotebooks, setFilteredNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  const history = useNavigate();

  const token = localStorage.getItem("auth_token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const jupyterConfig = JSON.parse(
      document.getElementById("datalayer-config-data").textContent
    );
    const jupyterUrl = jupyterConfig.jupyterServerHttpUrl;
    const token = jupyterConfig.jupyterToken;

    console.log('jupyterUrl','token')

    //     <!-- <script id="datalayer-config-data" type="application/json">
    //     {
    //       "jupyterServerHttpUrl": "https://jupyter-app.onrender.com/api/jupyter",
    //       "jupyterServerWsUrl": "wss://jupyter-app.onrender.com/api/jupyter",
    //       "jupyterToken": "60c1661cc408f978c309d04157af55c9588ff9557c9380e4fb50785750703da6"
    //     }
    // </script> -->
    // const token = localStorage.getItem('auth_token');
    const username = localStorage.getItem("username");
    // const jupyterUrl = `http://localhost:8000/hub/api/users/${username}/files`
    console.log("1234", { token, jupyterUrl });
    fetch(`${jupyterUrl}/api/contents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", { data });
        const notebooksList = data.content.filter(
          (item) => item.type === "notebook"
        );
        setNotebooks(notebooksList);
        setFilteredNotebooks(notebooksList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle Search Query Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = notebooks.filter((notebook) =>
      notebook.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredNotebooks(filtered);
  };

  // Handle Sort by Date
  const handleSortByDate = () => {
    const sorted = [...filteredNotebooks].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setFilteredNotebooks(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Define Table Columns using react-table
  const columns = React.useMemo(
    () => [
      {
        Header: "Notebook Name",
        accessor: "name",
        Cell: ({ row }) => (
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => handleEdit(row.original)} // On click, navigate to the notebook page
          >
            {row.original.name}
          </span>
        ),
      },
      {
        Header: "Created At",
        accessor: "created",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            {/* Delete action */}
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  // Create Table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredNotebooks,
    });

  // Handle Edit (Redirect to notebook)
  const handleEdit = (notebook) => {
    // Redirect to the notebook's page using its path
    history(`/notebook/${notebook.path}`);
  };

  // Handle Delete (Remove notebook from list)
  const handleDelete = (notebook) => {
    if (window.confirm(`Are you sure you want to delete ${notebook.name}?`)) {
      const jupyterConfig = JSON.parse(
        document.getElementById("datalayer-config-data").textContent
      );
      const jupyterUrl = jupyterConfig.jupyterServerHttpUrl;
      const token = jupyterConfig.jupyterToken;

      setLoading(true);

      fetch(`${jupyterUrl}/api/contents/${notebook.path}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete notebook from the server");
          }
          // Immediately update local state after deletion (without waiting for re-fetch)
          const updatedNotebooks = notebooks.filter(
            (nb) => nb.path !== notebook.path
          );
          setNotebooks(updatedNotebooks);
          setFilteredNotebooks(updatedNotebooks);

          // Fetch the updated list of notebooks from the server
          return fetch(
            `${jupyterUrl}/api/contents?timestamp=${new Date().getTime()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Cache-Control": "no-cache", // Prevent caching
              },
            }
          );
        })
        .then((response) => response.json())
        .then((data) => {
          const notebooksList = data.content.filter(
            (item) => item.type === "notebook"
          );
          setNotebooks(notebooksList);
          setFilteredNotebooks(notebooksList);
          alert("Notebook deleted successfully!");
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // Handle Create New Notebook
  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  // Make API Call to Create Notebook
  const handleCreateNotebook = () => {
    if (!newNotebookName) {
      alert("Please provide a name for the notebook");
      return;
    }

    const jupyterConfig = JSON.parse(
      document.getElementById("datalayer-config-data").textContent
    );
    const jupyterUrl = jupyterConfig.jupyterServerHttpUrl;
    const token = jupyterConfig.jupyterToken;

    setLoading(true);
    setError(null);

    const newNotebook = {
      type: "notebook",
      name: `${newNotebookName}.ipynb`,
      path: newNotebookName,
    };

    fetch(`${jupyterUrl}/api/contents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotebook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create notebook");
        }
        return response.json();
      })
      .then((data) => {
        return fetch(`${jupyterUrl}/api/contents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        const notebooksList = data.content.filter(
          (item) => item.type === "notebook"
        );
        setNotebooks(notebooksList);
        setFilteredNotebooks(notebooksList);
        setNewNotebookName("");
        setIsModalOpen(false);
        alert("Notebook created successfully!");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="notebooks-container">
      <div className="title-container">
        <h2>NOTEBOOKS</h2>
        <input
          className="search-box"
          type="text"
          placeholder="Search notebooks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="create-notebook-btn" onClick={handleCreateNew}>
          Create New Notebook
        </button>
      </div>

      {/* Notebook Table */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  onClick={
                    column.id === "created" ? handleSortByDate : undefined
                  }
                >
                  {column.render("Header")}
                  {column.id === "created" &&
                    (sortDirection === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for Creating New Notebook */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create New Notebook"
      >
        <div className="modal-header">
          <h2>Create New Notebook</h2>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newNotebookName}
            onChange={(e) => setNewNotebookName(e.target.value)}
            placeholder="Enter notebook name"
          />
          <button
            className="create-notebook-modal-btn"
            onClick={handleCreateNotebook}
          >
            Create
          </button>
          <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default NotebooksList;
