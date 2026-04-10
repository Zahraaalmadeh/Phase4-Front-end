import { useState } from "react";

export default function DocumentUploadPanel({ documents, onUploadDocument }) {
    const [type, setType] = useState("");
    const [fileName, setFileName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedName = fileName.trim();

        if (!type) {
            setStatusMessage("Please select a document type.");
            return;
        }

        if (!trimmedName) {
            setStatusMessage("Please enter a file name.");
            return;
        }

        const allowedPattern = /\.(pdf|doc|docx|png|jpg|jpeg)$/i;
        if (!allowedPattern.test(trimmedName)) {
            setStatusMessage(
                "Allowed file formats: pdf, doc, docx, png, jpg, jpeg."
            );
            return;
        }

        onUploadDocument({
            type,
            fileName: trimmedName,
        });

        setType("");
        setFileName("");
        setStatusMessage("Document uploaded successfully.");
    };

    return (
        <div className="card panel-card">
            <div className="section-header">
                <h2>Upload Basic Documents</h2>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
                <div>
                    <label>Document Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Select document type</option>
                        <option value="Invoice">Invoice</option>
                        <option value="Delivery Note">Delivery Note</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>File Name</label>
                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="example.pdf"
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Upload
                </button>

                {statusMessage && <p className="status-success">{statusMessage}</p>}
            </form>

            <div className="thread">
                <h3>Uploaded Documents</h3>

                <div className="stack">
                    {documents.length === 0 ? (
                        <p className="muted">No documents uploaded yet.</p>
                    ) : (
                        documents.map((item) => (
                            <div key={item.id} className="document-item">
                                <strong>{item.type}</strong>
                                <p>{item.fileName}</p>
                                <small>{item.uploadedAt}</small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}