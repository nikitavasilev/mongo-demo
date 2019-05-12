const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

/** Comparison query operators:
 * eq (equal)
 * ne (not equal)
 * gt (greater than)
 * gte (greater than or equal to)
 * lt (less than)
 * lte (less than or equal to)
 * in
 * nin (not in)
 *
 * Logical operators:
 * or
 * and
 *
 * Regex:
 * .find({ author: /^Mosh/ }) // starts with Mosh
 * .find({ author: /Hamedani$/i }) // ends with Hamedani
 */

// .find({ author: /.*Mosh.*/i }) // contains Mosh

async function getCourses() {
  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .find()
    .or([{ author: 'Mosh' }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    // .count() instead of select, for the count of documents
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
