import { Client } from "../model/Client.js";

export const createClient = async (req, res) => {
    try {
        const { name, email, phone, address, company, notes } = req.body;
        const user = req.user;
        if (!name || !email) {
            throw new Error("Name and email are required");
        }

        if (!phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone is required and must be a 10-digit number.',
            });
        }

        const existingClient = await Client.findOne({ email: email });
        if (existingClient) throw new Error("Client already exists");

        const newClient = await Client.create({
            name,
            email,
            phone: phone.toString(),
            address,
            company,
            notes,
            createdBy: user.id
        });

        return res.status(200).json({
            success: true,
            message: `New client created`,
            clientId: newClient.id
        });
    } catch (error) {
        console.log('[CREATE_CLIENT_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error.message}`
        });
    }
}

export const updateClient = async (req, res) => {
    try {
        const { name, phone, address, company, notes } = req.body;
        const { clientId } = req.params;

        if (!clientId) throw new Error("ClientId required");

        // Validations
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Name is required and must be a valid string.',
            });
        }

        if (!phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone is required and must be a 10-digit number.',
            });
        }

        if (!address || typeof address !== 'string' || address.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Address is required and must be a valid string.',
            });
        }

        if (!company || typeof company !== 'string' || company.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Company is required and must be a valid string.',
            });
        }

        if (notes && typeof notes !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Notes must be a valid string if provided.',
            });
        }

        const result = await Client.findByIdAndUpdate(clientId, {
            $set: {
                name,
                phone: phone.toString(),
                address,
                company,
                notes,
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Client updated successfully.',
            data: result,
        });
    } catch (error) {
        console.log('[UPDATE_CLIENT_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        await Client.findByIdAndDelete(clientId);

        return res.status(200).json({
            success: true,
            message: `Client deleted`
        });

    } catch (error) {
        console.log('[DELETE_CLIENT_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();

        return res.status(200).json({
            success: true,
            message: `All clients are fetched`,
            clients
        });
    } catch (error) {
        console.log('[GET_ALL_CLIENTS_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}

export const getClientById = async (req, res) => {
    try {
        const { clientId } = req.params;

        const client = await Client.findById(clientId);

        return res.status(200).json({
            success: true,
            message: `Client fetched successfully`,
            data: client
        });
    } catch (error) {
        console.log('[GET_CLIENT_BY_ID_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}