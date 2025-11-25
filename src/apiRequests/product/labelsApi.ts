import http from "@/utils/http";
import { ProLabelListResType } from "@/models/product/labelsModel";

const labelsApiRequest = {
    list: () => http.get<ProLabelListResType>('product-labels', { next: { tags: ['dishes'] } }),
}

export default labelsApiRequest