import { Jupyter, Notebook, CellSidebar } from "@datalayer/jupyter-react";
import { useParams, Link } from "react-router-dom";
import React from "react";
import "./NotebookPage.css";

function NotebookPage() {
  const { path } = useParams(); // Extract the notebook path from the URL parameter

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Notebooks", path: "/notebooks" },
    { label: path, path: "#" }, // Current notebook
  ];

  const token = localStorage.getItem('auth_token')
  
  return (
    <div className="notebook-page">
      {/* Breadcrumbs Section */}
      <div className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index}>
            <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && " > "}
          </span>
        ))}
      </div>

      {/* Header and Instructions */}
      <div className="notebook-header">
        <h2>Editing Notebook: {path}</h2>
        <p>
          Welcome to the notebook editor! Here you can:
          <ul>
            <li>
              <strong>Edit</strong> the cells in the notebook.
            </li>
            <li>
              <strong>Run</strong> code cells and view output.
            </li>
            <li>
              <strong>Collaborate</strong> with others in real-time.
            </li>
            <li>
              <strong>Save</strong> your work as you go.
            </li>
          </ul>
        </p>
      </div>

      {/* Jupyter Notebook Viewer */}
      <Jupyter startDefaultKernel={true} collaborative={true}>
      {/* <Jupyter
        startDefaultKernel={true}
        terminals={true}
        collaborative={true}
        jupyterServerHttpUrl={`http://localhost:8000/user/${token}`}
        jupyterServerWsUrl={`ws://localhost:8000/user${token}`}
        jupyterToken={token}
      > */}
        <Notebook path={path} CellSidebar={CellSidebar} />
      </Jupyter>
    </div>
  );
}

export default NotebookPage;
