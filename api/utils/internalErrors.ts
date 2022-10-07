export class InternalError extends Error {
	public readonly statusCode: number
	public readonly title: string
	public readonly detail: string

	constructor(title: string, detail: string, statusCode: number) {
		super(title)
		this.statusCode = statusCode
		this.title = title
		this.detail = detail
	}
}

export class DriverError extends Error {
	public readonly code: string
	public readonly errno: number
	public readonly sqlMessage: string
	public readonly stack: string

	constructor(code: string, errno: number, sqlMessage: string, stack: string) {
		super(code)
		this.errno = errno
		this.code = code
		this.sqlMessage = sqlMessage
		this.stack = stack
	}
}

export class BadRequestError extends InternalError {
	constructor(detail: string) {
		super("Bad Request Error", detail, 400)
	}
}

export class NotFoundError extends InternalError {
	constructor(detail: string) {
		super("Not Found Error", detail, 404)
	}
}

export class ConflictError extends InternalError {
	constructor(detail: string) {
		super("Conflict Error", detail, 409)
	}
}

export class UnsupportedMediaTypeError extends InternalError {
	constructor(detail: string) {
		super("Unsupported Media Type Error", detail, 415)
	}
}