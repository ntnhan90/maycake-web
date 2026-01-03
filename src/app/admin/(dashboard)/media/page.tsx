import MediaManager from "./mediaManager";
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Media Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function MediaPage() {
    return (
        <div className="container-fluid p-4">
            
            <MediaManager />        
        </div>
    );
}