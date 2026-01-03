import http from "@/utils/http";
import { FileListResType, FileResType, CreateFileBodyType } from "@/models/fileModel";
import { FolderListResType, FolderResType, CreateFolderBodyType } from "@/models/folderModel";
import { MediaTreeType } from "@/types/media.type";
const mediaApiRequest = {
    uploadFolder: (body: CreateFolderBodyType) => http.post<CreateFolderBodyType>("media/uploadFolder", body),
    uploadFile: (body: FormData) => http.post<CreateFileBodyType>("media/uploadFile", body),
}
export default mediaApiRequest;