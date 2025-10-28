import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ProgressBar,
} from 'react-bootstrap'
import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import UserChart from '@/components/Page/Dashboard/UserChart'
import IncomeChart from '@/components/Page/Dashboard/IncomeChart'
import ConversionChart from '@/components/Page/Dashboard/ConversionChart'
import SessionChart from '@/components/Page/Dashboard/SessionChart'
import TrafficChart from '@/components/Page/Dashboard/TrafficChart'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

    return (
        <div>
            <div className="row">
                <div className="col-sm-6 col-lg-3">
                <Card bg="primary" text="white" className="mb-4">
                    <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                    <div>
                        <div className="fs-4 fw-semibold">
                        26K
                        <span className="fs-6 ms-2 fw-normal">
                            (-12.4%
                            <FontAwesomeIcon icon={faArrowDown} fixedWidth />
                            )
                        </span>
                        </div>
                        <div>{dict.dashboard.featured.user}</div>
                    </div>
                    <Dropdown align="end">
                        <DropdownToggle
                        as="button"
                        bsPrefix="btn"
                        className="btn-link rounded-0 text-white shadow-none p-0"
                        id="dropdown-chart1"
                        >
                        <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                        </DropdownToggle>

                        <DropdownMenu>
                        <DropdownItem href="#/action-1">{dict.dashboard.featured.action.action1}</DropdownItem>
                        <DropdownItem href="#/action-2">{dict.dashboard.featured.action.action2}</DropdownItem>
                        <DropdownItem href="#/action-3">{dict.dashboard.featured.action.action3}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </CardBody>
                    <div className="mt-3 mx-3" style={{ height: '70px' }}>
                    <UserChart />
                    </div>
                </Card>
                </div>

                <div className="col-sm-6 col-lg-3">
                <Card bg="info" text="white" className="mb-4">
                    <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                    <div>
                        <div className="fs-4 fw-semibold">
                        $6.200
                        <span className="fs-6 ms-2 fw-normal">
                            (40.9%
                            <FontAwesomeIcon icon={faArrowUp} fixedWidth />
                            )
                        </span>
                        </div>
                        <div>{dict.dashboard.featured.income}</div>
                    </div>
                    <Dropdown align="end">
                        <DropdownToggle
                        as="button"
                        bsPrefix="btn"
                        className="btn-link rounded-0 text-white shadow-none p-0"
                        id="dropdown-chart2"
                        >
                        <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                        </DropdownToggle>

                        <DropdownMenu>
                        <DropdownItem href="#/action-1">{dict.dashboard.featured.action.action1}</DropdownItem>
                        <DropdownItem href="#/action-2">{dict.dashboard.featured.action.action2}</DropdownItem>
                        <DropdownItem href="#/action-3">{dict.dashboard.featured.action.action3}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </CardBody>
                    <div className="mt-3 mx-3" style={{ height: '70px' }}>
                    <IncomeChart />
                    </div>
                </Card>
                </div>

                <div className="col-sm-6 col-lg-3">
                <Card bg="warning" text="white" className="mb-4">
                    <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                    <div>
                        <div className="fs-4 fw-semibold">
                        2.49%
                        <span className="fs-6 ms-2 fw-normal">
                            (84.7%
                            <FontAwesomeIcon icon={faArrowUp} fixedWidth />
                            )
                        </span>
                        </div>
                        <div>{dict.dashboard.featured.conversion_rate}</div>
                    </div>
                    <Dropdown align="end">
                        <DropdownToggle
                        as="button"
                        bsPrefix="btn"
                        className="btn-link rounded-0 text-white shadow-none p-0"
                        id="dropdown-chart3"
                        >
                        <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                        </DropdownToggle>

                        <DropdownMenu>
                        <DropdownItem href="#/action-1">{dict.dashboard.featured.action.action1}</DropdownItem>
                        <DropdownItem href="#/action-2">{dict.dashboard.featured.action.action2}</DropdownItem>
                        <DropdownItem href="#/action-3">{dict.dashboard.featured.action.action3}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </CardBody>
                    <div className="mt-3 mx-3" style={{ height: '70px' }}>
                    <ConversionChart />
                    </div>
                </Card>
                </div>

                <div className="col-sm-6 col-lg-3">
                <Card bg="danger" text="white" className="mb-4">
                    <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                    <div>
                        <div className="fs-4 fw-semibold">
                        44K
                        <span className="fs-6 ms-2 fw-normal">
                            (-23.6%
                            <FontAwesomeIcon icon={faArrowDown} fixedWidth />
                            )
                        </span>
                        </div>
                        <div>{dict.dashboard.featured.sessions}</div>
                    </div>
                    <Dropdown align="end">
                        <DropdownToggle
                        as="button"
                        bsPrefix="btn"
                        className="btn-link rounded-0 text-white shadow-none p-0"
                        id="dropdown-chart4"
                        >
                        <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                        </DropdownToggle>

                        <DropdownMenu>
                        <DropdownItem href="#/action-1">{dict.dashboard.featured.action.action1}</DropdownItem>
                        <DropdownItem href="#/action-2">{dict.dashboard.featured.action.action2}</DropdownItem>
                        <DropdownItem href="#/action-3">{dict.dashboard.featured.action.action3}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </CardBody>
                    <div className="mt-3 mx-3" style={{ height: '70px' }}>
                    <SessionChart />
                    </div>
                </Card>
                </div>
            </div>

            <Card className="mb-4">
                <CardBody>
                <div className="d-flex justify-content-between">
                    <div>
                    <h4 className="mb-0">{dict.dashboard.traffic.title}</h4>
                    <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.traffic.duration}</div>
                    </div>
                    <div className="d-none d-md-block">
                    <ButtonGroup aria-label="Toolbar with buttons" className="mx-3">
                        <input
                        className="btn-check"
                        id="option1"
                        type="radio"
                        name="options"
                        autoComplete="off"
                        />
                        <label
                        className="btn btn-outline-secondary"
                        htmlFor="option1"
                        >
                        {dict.dashboard.traffic.option.day}
                        </label>
                        <input
                        className="btn-check"
                        id="option2"
                        type="radio"
                        name="options"
                        autoComplete="off"
                        defaultChecked
                        />
                        <label
                        className="btn btn-outline-secondary active"
                        htmlFor="option2"
                        >
                        {dict.dashboard.traffic.option.month}
                        </label>
                        <input
                        className="btn-check"
                        id="option3"
                        type="radio"
                        name="options"
                        autoComplete="off"
                        />
                        <label
                        className="btn btn-outline-secondary"
                        htmlFor="option3"
                        >
                        {dict.dashboard.traffic.option.year}
                        </label>
                    </ButtonGroup>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faDownload} fixedWidth />
                    </Button>
                    </div>
                </div>
                <div
                    style={{
                    height: '300px',
                    marginTop: '40px',
                    }}
                >
                    <TrafficChart />
                </div>
                </CardBody>
                <CardFooter>
                <div className="row row-cols-1 row-cols-md-5 text-center">
                    <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50 dark:text-gray-500">{dict.dashboard.traffic.category1}</div>
                    <div className="fw-semibold">
                        29.703
                        {dict.dashboard.traffic.users}
                        {' '}
                        (40%)
                    </div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="success"
                        now={40}
                    />
                    </div>
                    <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50 dark:text-gray-500">{dict.dashboard.traffic.category2}</div>
                    <div className="fw-semibold">
                        24.093
                        {dict.dashboard.traffic.users}
                        {' '}
                        (20%)
                    </div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="info"
                        now={20}
                    />
                    </div>
                    <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50 dark:text-gray-500">{dict.dashboard.traffic.category3}</div>
                    <div className="fw-semibold">
                        78.706
                        {dict.dashboard.traffic.views}
                        {' '}
                        (60%)
                    </div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="warning"
                        now={60}
                    />
                    </div>
                    <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50 dark:text-gray-500">{dict.dashboard.traffic.category4}</div>
                    <div className="fw-semibold">
                        22.123
                        {dict.dashboard.traffic.users}
                        {' '}
                        (80%)
                    </div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="danger"
                        now={80}
                    />
                    </div>
                    <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50 dark:text-gray-500">{dict.dashboard.traffic.category5}</div>
                    <div className="fw-semibold">40.15%</div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="primary"
                        now={40}
                    />
                    </div>
                </div>
                </CardFooter>
            </Card>

           

            <div className="row">
                <div className="col-md-12">
                    <Card>
                        <CardHeader>
                        {dict.dashboard.sales.title}
                        </CardHeader>
                        <CardBody>
                            <div className="table-responsive">
                                <table className="table border mb-0">
                                <thead className="fw-semibold">
                                    <tr className="align-middle table-light dark:table-dark">
                                    <th className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                                    </th>
                                    <th>{dict.dashboard.listing.headers.header1}</th>
                                    <th>{dict.dashboard.listing.headers.header2}</th>
                                    <th className="text-center">{dict.dashboard.listing.headers.header3}</th>
                                    <th>{dict.dashboard.listing.headers.header4}</th>
                                    <th aria-label="Action" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="align-middle">
                                    <td className="text-center">
                                        <div className="avatar avatar-md d-inline-flex position-relative">
                                        <Image
                                            fill
                                            sizes="40px"
                                            className="rounded-circle"
                                            src="/assets/img/avatars/1.jpg"
                                            alt="user@email.com"
                                        />
                                        <span
                                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white"
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{dict.dashboard.listing.items.item1.name}</div>
                                        <div className="small text-black-50 dark:text-gray-500">
                                        <span>{dict.dashboard.listing.user_status.new}</span>
                                        {' '}
                                        |
                                        {' '}
                                        {dict.dashboard.listing.registered}
                                        :
                                        {' '}
                                        {dict.dashboard.listing.registered_at}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                        <div className="float-start">
                                            <div className="fw-semibold">50%</div>
                                        </div>
                                        <div className="float-end">
                                            <small className="text-black-50 dark:text-gray-500">
                                            {dict.dashboard.listing.usage_duration}
                                            </small>
                                        </div>
                                        </div>
                                        <ProgressBar className="progress-thin" variant="success" now={50} />
                                    </td>
                                    <td className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
                                    </td>
                                    <td>
                                        <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.listing.last_login}</div>
                                        <div className="fw-semibold">{dict.dashboard.listing.items.item1.login_at}</div>
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                        <DropdownToggle
                                            as="button"
                                            bsPrefix="btn"
                                            className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                                            id="action-user1"
                                        >
                                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                                            <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                                            <DropdownItem
                                            className="text-danger"
                                            href="#/action-3"
                                            >
                                            {dict.action.delete}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    </tr>
                                    <tr className="align-middle">
                                    <td className="text-center">
                                        <div className="avatar avatar-md d-inline-flex position-relative">
                                        <Image
                                            fill
                                            sizes="40px"
                                            className="rounded-circle"
                                            src="/assets/img/avatars/2.jpg"
                                            alt="user@email.com"
                                        />
                                        <span
                                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-danger rounded-circle border border-white"
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{dict.dashboard.listing.items.item2.name}</div>
                                        <div className="small text-black-50 dark:text-gray-500">
                                        <span>{dict.dashboard.listing.user_status.recurring}</span>
                                        {' '}
                                        |
                                        {' '}
                                        {dict.dashboard.listing.registered}
                                        :
                                        {' '}
                                        {dict.dashboard.listing.registered_at}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                        <div className="float-start">
                                            <div className="fw-semibold">10%</div>
                                        </div>
                                        <div className="float-end">
                                            <small className="text-black-50 dark:text-gray-500">
                                            {dict.dashboard.listing.usage_duration}
                                            </small>
                                        </div>
                                        </div>
                                        <ProgressBar className="progress-thin" variant="info" now={10} />
                                    </td>
                                    <td className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faCcVisa} size="lg" fixedWidth />
                                    </td>
                                    <td>
                                        <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.listing.last_login}</div>
                                        <div className="fw-semibold">{dict.dashboard.listing.items.item2.login_at}</div>
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                        <DropdownToggle
                                            as="button"
                                            bsPrefix="btn"
                                            className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                                            id="action-user2"
                                        >
                                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                                            <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                                            <DropdownItem
                                            className="text-danger"
                                            href="#/action-3"
                                            >
                                            {dict.action.delete}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    </tr>
                                    <tr className="align-middle">
                                    <td className="text-center">
                                        <div className="avatar avatar-md d-inline-flex position-relative">
                                        <Image
                                            fill
                                            sizes="40px"
                                            className="rounded-circle"
                                            src="/assets/img/avatars/3.jpg"
                                            alt="user@email.com"
                                        />
                                        <span
                                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-warning rounded-circle border border-white"
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{dict.dashboard.listing.items.item3.name}</div>
                                        <div className="small text-black-50 dark:text-gray-500">
                                        <span>{dict.dashboard.listing.user_status.new}</span>
                                        {' '}
                                        |
                                        {' '}
                                        {dict.dashboard.listing.registered}
                                        :
                                        {' '}
                                        {dict.dashboard.listing.registered_at}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                        <div className="float-start">
                                            <div className="fw-semibold">74%</div>
                                        </div>
                                        <div className="float-end">
                                            <small className="text-black-50 dark:text-gray-500">
                                            {dict.dashboard.listing.usage_duration}
                                            </small>
                                        </div>
                                        </div>
                                        <ProgressBar className="progress-thin" variant="warning" now={74} />
                                    </td>
                                    <td className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faCcStripe} size="lg" fixedWidth />
                                    </td>
                                    <td>
                                        <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.listing.last_login}</div>
                                        <div className="fw-semibold">{dict.dashboard.listing.items.item3.login_at}</div>
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                        <DropdownToggle
                                            as="button"
                                            bsPrefix="btn"
                                            className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                                            id="action-user3"
                                        >
                                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                                            <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                                            <DropdownItem
                                            className="text-danger"
                                            href="#/action-3"
                                            >
                                            {dict.action.delete}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    </tr>
                                    <tr className="align-middle">
                                    <td className="text-center">
                                        <div className="avatar avatar-md d-inline-flex position-relative">
                                        <Image
                                            fill
                                            sizes="40px"
                                            className="rounded-circle"
                                            src="/assets/img/avatars/4.jpg"
                                            alt="user@email.com"
                                        />
                                        <span
                                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-secondary rounded-circle border border-white"
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{dict.dashboard.listing.items.item4.name}</div>
                                        <div className="small text-black-50 dark:text-gray-500">
                                        <span>{dict.dashboard.listing.user_status.new}</span>
                                        {' '}
                                        |
                                        {' '}
                                        {dict.dashboard.listing.registered}
                                        :
                                        {' '}
                                        {dict.dashboard.listing.registered_at}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                        <div className="float-start">
                                            <div className="fw-semibold">98%</div>
                                        </div>
                                        <div className="float-end">
                                            <small className="text-black-50 dark:text-gray-500">
                                            {dict.dashboard.listing.usage_duration}
                                            </small>
                                        </div>
                                        </div>
                                        <ProgressBar className="progress-thin" variant="danger" now={98} />
                                    </td>
                                    <td className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faCcPaypal} size="lg" fixedWidth />
                                    </td>
                                    <td>
                                        <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.listing.last_login}</div>
                                        <div className="fw-semibold">{dict.dashboard.listing.items.item4.login_at}</div>
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                        <DropdownToggle
                                            as="button"
                                            bsPrefix="btn"
                                            className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                                            id="action-user4"
                                        >
                                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                                            <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                                            <DropdownItem
                                            className="text-danger"
                                            href="#/action-3"
                                            >
                                            {dict.action.delete}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    </tr>
                                    <tr className="align-middle">
                                    <td className="text-center">
                                        <div className="avatar avatar-md d-inline-flex position-relative">
                                        <Image
                                            fill
                                            sizes="40px"
                                            className="rounded-circle"
                                            src="/assets/img/avatars/5.jpg"
                                            alt="user@email.com"
                                        />
                                        <span
                                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white"
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{dict.dashboard.listing.items.item5.name}</div>
                                        <div className="small text-black-50 dark:text-gray-500">
                                        <span>{dict.dashboard.listing.user_status.new}</span>
                                        {' '}
                                        |
                                        {' '}
                                        {dict.dashboard.listing.registered}
                                        :
                                        {' '}
                                        {dict.dashboard.listing.registered_at}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                        <div className="float-start">
                                            <div className="fw-semibold">22%</div>
                                        </div>
                                        <div className="float-end">
                                            <small className="text-black-50 dark:text-gray-500">
                                            {dict.dashboard.listing.usage_duration}
                                            </small>
                                        </div>
                                        </div>
                                        <ProgressBar className="progress-thin" variant="info" now={22} />
                                    </td>
                                    <td className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faCcApplePay} size="lg" fixedWidth />
                                    </td>
                                    <td>
                                        <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.listing.last_login}</div>
                                        <div className="fw-semibold">{dict.dashboard.listing.items.item5.login_at}</div>
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                        <DropdownToggle
                                            as="button"
                                            bsPrefix="btn"
                                            className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                                            id="action-user5"
                                        >
                                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                                            <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                                            <DropdownItem
                                            className="text-danger"
                                            href="#/action-3"
                                            >
                                            {dict.action.delete}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    </tr>
                                    <tr className="align-middle">
                                    <td className="text-center">
                                        <div className="avatar avatar-md d-inline-flex position-relative">
                                        <Image
                                            fill
                                            sizes="40px"
                                            className="rounded-circle"
                                            src="/assets/img/avatars/6.jpg"
                                            alt="user@email.com"
                                        />
                                        <span
                                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-danger rounded-circle border border-white"
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{dict.dashboard.listing.items.item6.name}</div>
                                        <div className="small text-black-50 dark:text-gray-500">
                                        <span>{dict.dashboard.listing.user_status.new}</span>
                                        {' '}
                                        |
                                        {' '}
                                        {dict.dashboard.listing.registered}
                                        :
                                        {' '}
                                        {dict.dashboard.listing.registered_at}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                        <div className="float-start">
                                            <div className="fw-semibold">43%</div>
                                        </div>
                                        <div className="float-end">
                                            <small className="text-black-50 dark:text-gray-500">
                                            {dict.dashboard.listing.usage_duration}
                                            </small>
                                        </div>
                                        </div>
                                        <ProgressBar className="progress-thin" variant="success" now={43} />
                                    </td>
                                    <td className="text-center" aria-label="icon">
                                        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
                                    </td>
                                    <td>
                                        <div className="small text-black-50 dark:text-gray-500">{dict.dashboard.listing.last_login}</div>
                                        <div className="fw-semibold">{dict.dashboard.listing.items.item6.login_at}</div>
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                        <DropdownToggle
                                            as="button"
                                            bsPrefix="btn"
                                            className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                                            id="action-user6"
                                        >
                                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                                            <DropdownItem href="#/action-2">{dict.action.edit}</DropdownItem>
                                            <DropdownItem
                                            className="text-danger"
                                            href="#/action-3"
                                            >
                                            {dict.action.delete}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}
