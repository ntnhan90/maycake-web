import { Row, Col, Card, CardHeader, FormControl, } from "react-bootstrap"
import TanstackTable from "@/components/table/TanstackTable";
import { userListColumns } from "./ColumnDifinitions";
import { userListData } from "@/data/UserData";

const UserListing = () => {
  	return (
		<Row> 
			<Col>
				<Card className="card-lg" id="productList">
					<CardHeader className="border-bottom-0">
						<Row className="g-4">
							<Col lg={4}>
								<FormControl
									type="search"
									className="listjs-search"
									placeholder="Search"
									/>
							</Col>
						</Row>
					</CardHeader>

					{/* Product List Table 
					<TanstackTable
						data={productListData}
						columns={productListColumns}
						pagination={true}
						isSortable
					/>
                    */}
				</Card>
			</Col>
            <TanstackTable
				data={userListData}
				columns={userListColumns}
				pagination={true}
				isSortable
			/>
		</Row>
	)
}

export default UserListing