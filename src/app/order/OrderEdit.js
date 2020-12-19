import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { DatePicker, DateTimePicker, EditScreen, FieldGroup, TextArea } from '../../shared'
import { CustomerSelect } from '../customer/CustomerSelects'
import { updateOrder, useOrderEdit } from './order-api'
import { addMinutes, startOfToday, subDays } from 'date-fns'

export default () =>
  <EditScreen
    title="Edit order"
    entityTitle="Order"
    url="/orders"
    useResource={useOrderEdit}
    rows={5}
    validationSchema={
      Yup.object({
        orderNumber: Yup.string()
          .required(),
        customer: Yup.object().nullable()
          .required(),
        received: Yup.date().nullable()
          .required()
          .min(subDays(startOfToday(), 7))
          .max(addMinutes(new Date(), 1)),
        deliveryDate: Yup.date().nullable()
          .required()
          .min(startOfToday()),
        note: Yup.string()
      })
    }
    update={data => updateOrder(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={CustomerSelect} name="customer" label="Customer" sm={[2, 9]} required/>
    <FieldGroup as={DateTimePicker} name="received" label="Received" sm={[2, 9]} required
                minDate={subDays(startOfToday(), 7)} maxDate={new Date()}/>
    <FieldGroup as={DatePicker} name="deliveryDate" label="Delivery date" sm={[2, 9]} required
                minDate={startOfToday()}/>
    <FieldGroup as={TextArea} name="note" label="Note" sm={[2, 9]} rows={5}/>

  </EditScreen>
