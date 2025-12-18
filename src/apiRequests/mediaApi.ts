import http from "@/utils/http";
import { FileListResType, FileResType, CreateFileBodyType } from "@/models/fileModel";
import { FolderListResType, FolderResType, CreateFolderBodyType } from "@/models/folderMolder";

const mediaApiRequest = {
    uploadFolder: (body: CreateFolderBodyType) => http.post<CreateFolderBodyType>("media/uploadFolder", body),
    uploadFile: (body: CreateFileBodyType) => http.post<CreateFileBodyType>("media/upload", body),
}
export default mediaApiRequest;