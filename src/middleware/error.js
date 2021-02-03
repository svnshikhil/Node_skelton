const { ValidationError, NotFoundError } = require("objection");
const {
    DBError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError,
} = require("objection-db-errors");
const {
    DomainError,
    httpStatus,
    BadRequestError,
} = require("../services/error");
const { apiFmt, logFmt } = require("../services/fmt");

/**
 * Database error middleware handler
 */
function dbErrorHandler(err, req, res) {
    let error = "An internal error occured.";
    if (err.detail) {
        error = err.detail;
    }
    if (err instanceof ValidationError) {
        return res.status(httpStatus.BAD_REQUEST).json(apiFmt(error));
    }
    if (err instanceof NotFoundError) {
        return res.status(httpStatus.NOT_FOUND).json(apiFmt(error));
    }
    if (err instanceof UniqueViolationError) {
        return res.status(httpStatus.CONFLICT).json(apiFmt(error));
    }
    if (err instanceof NotNullViolationError) {
        return res.status(httpStatus.BAD_REQUEST).json(apiFmt(error));
    }
    if (err instanceof ForeignKeyViolationError) {
        return res.status(httpStatus.CONFLICT).json(apiFmt(error));
    }
    if (err instanceof CheckViolationError) {
        return res.status(httpStatus.BAD_REQUEST).json(apiFmt(error));
    }
    if (err instanceof DataError) {
        return res.status(httpStatus.BAD_REQUEST).json(apiFmt(error));
    }
    if (err instanceof DBError) {
        return res.status(httpStatus.INTERNAL_ERROR).json(apiFmt(error));
    }
}

/**
 * Handle schema errors
 *
 * @param {*} err Country Code
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next callback
 */
function schemaError(err, req, res, next) {
    // Log the error however you please
    logFmt(req, err);
    // logs "express-jsonschema: Invalid data found"

    // Set a bad request http response status or whatever you want

    // Format the response body however you want
    return res.status(err.status || 400).json(apiFmt(err.validations));
}

module.exports = (err, req, res, next) => {
    // Logger
    logFmt(req, err);

    // Database error handler
    dbErrorHandler(err, req, res);
    if (res.headersSent) {
        return next(err);
    }
    if (err.name === "JsonSchemaValidation") {
        return schemaError(err, req, res, next);
    }

    if (err instanceof BadRequestError) {
        return res.status(err.status).json(apiFmt(err));
    }
    // Check for instance of domain error
    if (err instanceof DomainError) {
        return res.status(err.status).json(apiFmt(err));
    }

    // Return generic internal error if none specified
    let error = "An internal error occured.";
    if (err.detail) {
        error = err.detail;
    }
    res.status(httpStatus.INTERNAL_ERROR).json(apiFmt(new Error(error)));
};
