import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import Form from "react-bootstrap/Form";

function AddToDo({ onAddItem }) {

    const { register, handleSubmit, reset, formState,
    } = useForm({
        defaultValues: {
            newItem: '',
            dueDate: ''
        }
    });

    // Reset input fields if the form is successfully submitted
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                newItem: '',
                dueDate: ''
            });
        }
    }, [formState, reset]);

    return (
        <Form onSubmit={handleSubmit(onAddItem)}>
            <Form.Label>
                Description
                <Form.Control {...register("newItem", { required: true })} type='text' id='newItem' />
            </Form.Label>
            <Form.Label>
                Due date
                <Form.Control {...register("dueDate", { required: true })} type='date' id='dueDate' />
            </Form.Label>
            <Form.Control type='submit' value='Add' />
            {formState.errors.newItem?.type === 'required' && <Form.Text className="text-muted">Description is required</Form.Text>}<br />
            {formState.errors.dueDate?.type === 'required' && <Form.Text className="text-muted">Date is required</Form.Text>}
        </Form>
    )
}

export default AddToDo;
