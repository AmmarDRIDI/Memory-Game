import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";


export default function WinAlert({ handleClose, open ,moves}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="win-dialog-title"
            PaperProps={{ className: "win-dialog-paper" }}
            sx={{
                "& .MuiPaper-root": {
                    backgroundImage: "none",
                    backgroundColor: "#0f172a",
                    color: "#f8fafc",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "12px",
                },
                "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(2, 6, 23, 0.78)",
                    backdropFilter: "blur(2px)",
                },
            }}
        >
            <DialogContent  className="win-dialog-content">
                <div className="win-badge" aria-hidden="true">
                    <EmojiEventsTwoToneIcon className="win-icon" fontSize="large" />
                </div>
                <h2 id="win-dialog-title" className="win-title">
                    Victory
                </h2>
                <p className="win-subtitle">
                    Excellent memory! You matched all cards with {moves} moves.
                </p>
            </DialogContent>

            <DialogActions className="win-dialog-actions">
                <Button className="win-cta" onClick={handleClose}>
                    Play Again
                </Button>
            </DialogActions>
        </Dialog>
    );
}
